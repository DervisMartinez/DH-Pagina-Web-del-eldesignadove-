import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { sortAndRankStandings } from '@/lib/baseball-standings';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const season = searchParams.get('season') || '2026-2027';

  try {
    const res = await pool.query('SELECT stage, data FROM posiciones_lvbp WHERE season = $1', [season]);

    const standings: Record<string, any[]> = {
      'Temporada Regular': [],
      'Series Particulares': [],
      'Play Offs / Comodín': [],
      'Round Robin': [],
      'Final': [],
    };

    if (res.rows.length > 0) {
      res.rows.forEach((row) => {
        standings[row.stage] = row.stage === 'Series Particulares' 
          ? row.data 
          : sortAndRankStandings(row.data);
      });
    }

    return NextResponse.json({
      season,
      updatedAt: new Date().toISOString(),
      standings,
    });
  } catch (error: any) {
    console.error('Error fetching standings from Supabase:', error);
    return NextResponse.json(
      { error: error.message, standings: {} },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { season, stage, data } = body;

    if (!season || !stage || !Array.isArray(data)) {
      return NextResponse.json(
        { error: 'season, stage y data (array) son requeridos' },
        { status: 400 }
      );
    }

    const processedData = stage === 'Series Particulares' ? data : sortAndRankStandings(data);

    await pool.query(
      `INSERT INTO posiciones_lvbp (season, stage, data, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (season, stage) 
       DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [season, stage, JSON.stringify(processedData)]
    );

    try {
      revalidatePath('/lvbp');
      revalidatePath('/');
    } catch (e) {
      // Background non-blocking
    }

    return NextResponse.json({ success: true, season, stage, data: processedData });
  } catch (error: any) {
    console.error('Error saving standings to Supabase:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
