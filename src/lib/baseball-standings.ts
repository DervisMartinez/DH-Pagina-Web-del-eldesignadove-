export interface TeamStanding {
  id: number;
  team: string;
  code: string;
  jj: number;
  jg: number;
  jp: number;
  ave: string;
  dif: string;
  racha: string;
  ult10: string;
  casa: string;
  ruta: string;
  ca: number;
  cp: number;
  cacp: number;
  status: string;
}

/**
 * Ordena y clasifica la tabla de posiciones según las reglas oficiales de la LVBP / MLB:
 * 1. Mayor porcentaje de victorias (AVE).
 * 2. Mayor número de victorias (JG).
 * 3. Menor número de derrotas (JP).
 * 4. Mejor diferencial de carreras (CA - CP).
 * 5. Mayor cantidad de carreras anotadas (CA).
 * 6. Orden alfabético si todo lo anterior es idéntico.
 * 
 * Además, calcula automáticamente los Juegos de Diferencia (DIF / Games Behind)
 * con la fórmula oficial: GB = ((JG_líder - JG_equipo) + (JP_equipo - JP_líder)) / 2
 */
export function sortAndRankStandings(teams: TeamStanding[]): TeamStanding[] {
  if (!teams || teams.length === 0) return [];

  const parseAve = (val: any): number => {
    if (val === undefined || val === null || val === '') return 0;
    const str = val.toString().trim();
    if (str.startsWith('.')) return parseFloat(`0${str}`) || 0;
    return parseFloat(str) || 0;
  };

  // 1. Ordenar por mérito deportivo
  const sorted = [...teams].sort((a, b) => {
    const aveA = parseAve(a.ave);
    const aveB = parseAve(b.ave);

    // Criterio 1: Porcentaje (AVE)
    if (Math.abs(aveB - aveA) > 0.0001) {
      return aveB - aveA;
    }

    // Criterio 2: Más victorias (JG)
    const jgA = Number(a.jg) || 0;
    const jgB = Number(b.jg) || 0;
    if (jgB !== jgA) {
      return jgB - jgA;
    }

    // Criterio 3: Menos derrotas (JP)
    const jpA = Number(a.jp) || 0;
    const jpB = Number(b.jp) || 0;
    if (jpA !== jpB) {
      return jpA - jpB;
    }

    // Criterio 4: Diferencial de carreras (CA - CP)
    const diffA = Number(a.cacp) || 0;
    const diffB = Number(b.cacp) || 0;
    if (diffB !== diffA) {
      return diffB - diffA;
    }

    // Criterio 5: Carreras anotadas (CA)
    const caA = Number(a.ca) || 0;
    const caB = Number(b.ca) || 0;
    if (caB !== caA) {
      return caB - caA;
    }

    // Criterio 6: Desempate alfabético
    return (a.team || '').localeCompare(b.team || '');
  });

  // 2. Calcular Juegos de Diferencia (DIF) respecto al 1er lugar
  const leader = sorted[0];
  const leaderJG = Number(leader.jg) || 0;
  const leaderJP = Number(leader.jp) || 0;
  const anyGamesPlayed = sorted.some((t) => (Number(t.jj) || 0) > 0);

  return sorted.map((team, index) => {
    let dif = team.dif;

    if (!anyGamesPlayed) {
      dif = '0';
    } else if (index === 0) {
      dif = '-';
    } else {
      const teamJG = Number(team.jg) || 0;
      const teamJP = Number(team.jp) || 0;
      const gb = ((leaderJG - teamJG) + (teamJP - leaderJP)) / 2;
      dif = gb <= 0 ? '-' : gb % 1 === 0 ? gb.toFixed(0) : gb.toFixed(1);
    }

    return {
      ...team,
      dif,
    };
  });
}
