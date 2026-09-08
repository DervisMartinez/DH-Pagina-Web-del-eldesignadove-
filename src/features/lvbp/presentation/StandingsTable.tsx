'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TeamStanding {
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

interface StandingsData {
  updatedAt: string;
  standings: Record<string, TeamStanding[]>;
}

export function StandingsTable() {
  const [data, setData] = useState<Record<string, TeamStanding[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Temporada Regular');
  const [selectedYear, setSelectedYear] = useState('2024-2025');

  const tabs = ['Temporada Regular', 'Series Particulares', 'Play Offs / Comodín', 'Round Robin', 'Final'];

  // Map of team codes to their local logo filenames
  const teamLogos: Record<string, string> = {
    'MAG': '/ICONS-LVBP/Magallanes_B.B.C._logo.png',
    'ZUL': '/ICONS-LVBP/aquilasdelzulia.jpg',
    'CAR': '/ICONS-LVBP/caribeslogo.webp',
    'LEO': '/ICONS-LVBP/leoneslogo.jpg',
    'LAR': '/ICONS-LVBP/logo-cardenales.png',
    'MAR': '/ICONS-LVBP/BravosdeMargaritalogo.png',
    'TIB': '/ICONS-LVBP/Tiburones_La_Guaira_logo.png',
    'ARA': '/ICONS-LVBP/tigresdearagualogo.png',
  };

  useEffect(() => {
    // Para simplificar, la API siempre devuelve los datos de la última temporada.
    // Cuando conectemos Supabase, le pasaremos el año al endpoint (?year=2024-2025)
    fetch('/api/lvbp-standings')
      .then((res) => res.json())
      .then((json) => {
        setData(json.standings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [selectedYear]);

  const currentData = data[activeTab] || [];

  return (
    <div className="w-full max-w-6xl mx-auto bg-surface-container-low rounded-2xl shadow-2xl overflow-hidden border border-surface-container-highest">
      <div className="p-6 md:p-8 bg-surface-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-primary font-bold tracking-tight">
            Posiciones LVBP
          </h2>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-surface-container border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary p-2 outline-none cursor-pointer"
          >
            <option value="2024-2025">2024 - 2025</option>
            {/* <option value="2025-2026">2025 - 2026</option> */}
          </select>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar bg-surface-container-highest rounded-xl p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 whitespace-nowrap px-6 py-2.5 rounded-lg font-label-caps text-[11px] md:text-label-caps uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-primary text-on-primary shadow-md font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="border-b border-surface-container-highest text-on-surface-variant font-label-caps text-[10px] md:text-label-caps uppercase tracking-wider">
                  <th className="py-4 px-4 font-medium sticky left-0 bg-surface-container z-20 shadow-[1px_0_0_0_var(--tw-shadow-color)] shadow-surface-container-highest">Equipo</th>
                  <th className="py-4 px-3 text-center font-medium">JJ</th>
                  <th className="py-4 px-3 text-center font-medium">JG</th>
                  <th className="py-4 px-3 text-center font-medium">JP</th>
                  <th className="py-4 px-3 text-center font-medium">AVE</th>
                  <th className="py-4 px-4 text-center font-medium">DIF.</th>
                  <th className="py-4 px-3 text-center font-medium">RACHA</th>
                  <th className="py-4 px-3 text-center font-medium">ULT-10</th>
                  <th className="py-4 px-3 text-center font-medium">CASA</th>
                  <th className="py-4 px-3 text-center font-medium">RUTA</th>
                  <th className="py-4 px-3 text-center font-medium">CA</th>
                  <th className="py-4 px-3 text-center font-medium">CP</th>
                  <th className="py-4 px-3 text-center font-medium">CA-CP</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={13} className="py-12 text-center text-on-surface-variant animate-pulse">
                      Actualizando posiciones en tiempo real...
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="py-12 text-center text-on-surface-variant">
                      No hay datos disponibles para esta etapa todavía.
                    </td>
                  </tr>
                ) : (
                  currentData.map((team, index) => {
                    const isTop4 = activeTab === 'Temporada Regular' && index < 4;
                    const rowBgClass = isTop4 ? 'bg-primary/5' : 'bg-surface-container';
                    
                    return (
                      <tr 
                        key={team.id} 
                        className={`border-b border-surface-container-lowest hover:bg-surface-container-highest transition-colors ${rowBgClass}`}
                      >
                        <td className={`py-4 px-4 sticky left-0 z-10 shadow-[1px_0_0_0_var(--tw-shadow-color)] shadow-surface-container-lowest transition-colors hover:bg-surface-container-highest ${rowBgClass}`}>
                          <div className="flex items-center gap-3 w-[220px] md:w-auto">
                            {teamLogos[team.code] ? (
                              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white shrink-0 shadow-sm border border-outline-variant/30 flex items-center justify-center">
                                <Image src={teamLogos[team.code]} alt={`Logo ${team.team}`} fill className="object-contain p-1" unoptimized />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xs shrink-0 border border-outline-variant/30">
                                {team.code}
                              </div>
                            )}
                            <span className="text-secondary font-medium mr-1 w-4 text-center shrink-0">{team.status}</span>
                            <span className="text-on-surface font-bold text-[13px] md:text-[14px] truncate">{team.team}</span>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.jj}</td>
                        <td className="py-4 px-3 text-center text-on-surface font-stat-numeric text-[15px]">{team.jg}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.jp}</td>
                        <td className="py-4 px-3 text-center text-primary font-stat-numeric text-[15px] font-medium">{team.ave}</td>
                        <td className="py-4 px-4 text-center text-on-surface font-stat-numeric text-[16px] font-bold">{team.dif}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.racha}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px] whitespace-nowrap">{team.ult10}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px] whitespace-nowrap">{team.casa}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px] whitespace-nowrap">{team.ruta}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.ca}</td>
                        <td className="py-4 px-3 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.cp}</td>
                        <td className={`py-4 px-3 text-center font-stat-numeric text-[15px] ${team.cacp > 0 ? 'text-green-500' : team.cacp < 0 ? 'text-red-500' : 'text-on-surface-variant'}`}>{team.cacp}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
        </div>

        {/* Legend */}
        {activeTab === 'Temporada Regular' && (
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] md:text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">*</span> Clasificado al Round Robin</span>
            <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">#</span> Puestos de Comodín</span>
            <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">++</span> Eliminados</span>
          </div>
        )}
        {activeTab === 'Play Offs / Comodín' && (
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] md:text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">*</span> Clasificado al Round Robin</span>
            <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">++</span> Eliminado</span>
          </div>
        )}
      </div>
    </div>
  );
}
