'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { sortAndRankStandings, type TeamStanding } from '@/lib/baseball-standings';

export function StandingsTable() {
  const [data, setData] = useState<Record<string, TeamStanding[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Temporada Regular');
  const [selectedYear, setSelectedYear] = useState('2026-2027');

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

  // Nombres cortos para pantallas móviles
  const shortTeamNames: Record<string, string> = {
    'MAG': 'Magallanes',
    'ZUL': 'Águilas',
    'CAR': 'Caribes',
    'LEO': 'Leones',
    'LAR': 'Cardenales',
    'MAR': 'Bravos',
    'TIB': 'Tiburones',
    'ARA': 'Tigres',
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/lvbp-standings?season=${selectedYear}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.standings || {});
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [selectedYear]);

  const rawData = data[activeTab] || [];
  const currentData = activeTab === 'Series Particulares' 
    ? rawData 
    : sortAndRankStandings(rawData);

  return (
    <div className="w-full max-w-6xl mx-auto bg-surface-container-low rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-surface-container-highest">
      <div className="p-3.5 sm:p-6 md:p-8 bg-surface-container">
        
        {/* Header con Título y Selector de Año */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="font-headline-lg text-[20px] sm:text-[24px] md:text-headline-lg text-primary font-bold tracking-tight">
              Posiciones LVBP
            </h2>
            {selectedYear === '2026-2027' && (
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-label-caps text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                Campaña 2026-2027
              </span>
            )}
          </div>
          <div className="w-full sm:w-auto">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-auto bg-surface-container border border-outline-variant text-on-surface text-xs sm:text-sm rounded-xl focus:ring-primary focus:border-primary p-2.5 outline-none cursor-pointer font-bold shadow-sm"
            >
              <option value="2026-2027">2026 - 2027 (En Curso)</option>
              <option value="2024-2025">2024 - 2025</option>
            </select>
          </div>
        </div>
        
        {/* Pestañas (Tabs) con scroll suave en móviles */}
        <div className="flex overflow-x-auto no-scrollbar bg-surface-container-highest rounded-xl p-1 gap-1 mb-4 sm:mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 rounded-lg font-label-caps text-[10px] sm:text-[11px] md:text-label-caps uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-primary text-on-primary shadow-md font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Indicador visual de deslizamiento en móvil */}
        <div className="flex md:hidden items-center justify-between px-1 mb-2 text-[10px] text-outline font-label-caps uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] animate-pulse">swipe</span>
            Desliza horizontalmente la tabla
          </span>
          <span className="text-[10px] text-primary/80 font-bold">13 Estadísticas</span>
        </div>

        {/* Contenedor de la Tabla con Sticky Column */}
        <div className="overflow-x-auto rounded-xl border border-surface-container-highest bg-surface-container-lowest">
          <table className="w-full text-left border-collapse min-w-max text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container text-on-surface-variant font-label-caps text-[9px] sm:text-[10px] md:text-label-caps uppercase tracking-wider">
                {/* Columna fija: Equipo */}
                <th className="py-3 sm:py-4 px-2 sm:px-3 font-medium sticky left-0 z-20 bg-surface-container shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] border-r border-surface-container-highest">
                  Equipo
                </th>
                <th className="py-3 sm:py-4 px-2 text-center font-medium w-9 sm:w-12">JJ</th>
                <th className="py-3 sm:py-4 px-2 text-center font-medium w-9 sm:w-12 text-on-surface font-bold">JG</th>
                <th className="py-3 sm:py-4 px-2 text-center font-medium w-9 sm:w-12">JP</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium w-14 sm:w-16 text-primary">AVE</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium w-12 sm:w-14">DIF.</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">RACHA</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">ULT-10</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">CASA</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">RUTA</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">CA</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">CP</th>
                <th className="py-3 sm:py-4 px-2 sm:px-3 text-center font-medium">CA-CP</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-on-surface-variant animate-pulse font-label-caps text-xs">
                    Actualizando posiciones en tiempo real...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-on-surface-variant font-body-sm">
                    No hay datos disponibles para esta etapa todavía.
                  </td>
                </tr>
              ) : (
                currentData.map((team, index) => {
                  const isTop4 = activeTab === 'Temporada Regular' && index < 4;
                  const isComodin = activeTab === 'Temporada Regular' && (index === 4 || index === 5);
                  const rowBgClass = isTop4 
                    ? 'bg-primary/5' 
                    : isComodin 
                    ? 'bg-surface-container-high/40' 
                    : 'bg-surface-container-lowest';
                  
                  return (
                    <tr 
                      key={team.id || `${team.code}-${index}`} 
                      className={`border-b border-surface-container-highest/60 hover:bg-surface-container-high transition-colors ${rowBgClass}`}
                    >
                      {/* Columna fija: Posición + Logo + Nombre */}
                      <td className={`py-2.5 sm:py-3.5 px-2 sm:px-3 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] border-r border-surface-container-highest transition-colors hover:bg-surface-container-high ${rowBgClass}`}>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 w-[135px] sm:w-[170px] md:w-[210px]">
                          {/* Número de posición (1 a 8) */}
                          <span className={`font-stat-numeric text-[11px] sm:text-xs font-bold w-3.5 sm:w-4 text-center shrink-0 ${
                            isTop4 ? 'text-primary font-black' : 'text-outline'
                          }`}>
                            {index + 1}
                          </span>

                          {/* Logo del Equipo */}
                          {teamLogos[team.code] ? (
                            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-white shrink-0 shadow-sm border border-outline-variant/30 flex items-center justify-center">
                              <Image 
                                src={teamLogos[team.code]} 
                                alt={`Logo ${team.team}`} 
                                fill 
                                className="object-contain p-0.5" 
                                unoptimized 
                              />
                            </div>
                          ) : (
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-[9px] shrink-0 border border-outline-variant/30">
                              {team.code}
                            </div>
                          )}

                          {/* Nombre del Equipo (Corto en móvil, completo en tablet/desktop) */}
                          <div className="flex flex-col min-w-0 pr-1">
                            <span className="text-on-surface font-bold text-[11px] sm:text-xs md:text-[13px] leading-tight truncate">
                              <span className="inline sm:hidden">{shortTeamNames[team.code] || team.team}</span>
                              <span className="hidden sm:inline">{team.team}</span>
                            </span>
                            {team.status && (
                              <span className="text-[9px] sm:text-[10px] text-secondary font-medium leading-none mt-0.5">
                                {team.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Estadísticas de Juegos y Porcentajes */}
                      <td className="py-2.5 sm:py-3.5 px-2 text-center text-on-surface-variant font-stat-numeric text-[12px] sm:text-[14px]">
                        {team.jj}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 text-center text-on-surface font-stat-numeric text-[12px] sm:text-[14px] font-bold">
                        {team.jg}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 text-center text-on-surface-variant font-stat-numeric text-[12px] sm:text-[14px]">
                        {team.jp}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-primary font-stat-numeric text-[12px] sm:text-[14px] font-black">
                        {team.ave}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface font-stat-numeric text-[13px] sm:text-[15px] font-black">
                        {team.dif}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[12px] sm:text-[14px]">
                        {team.racha}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[11px] sm:text-[13px] whitespace-nowrap">
                        {team.ult10}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[11px] sm:text-[13px] whitespace-nowrap">
                        {team.casa}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[11px] sm:text-[13px] whitespace-nowrap">
                        {team.ruta}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[12px] sm:text-[14px]">
                        {team.ca}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-2 sm:px-3 text-center text-on-surface-variant font-stat-numeric text-[12px] sm:text-[14px]">
                        {team.cp}
                      </td>
                      <td className={`py-2.5 sm:py-3.5 px-2 sm:px-3 text-center font-stat-numeric text-[12px] sm:text-[14px] font-bold ${
                        Number(team.cacp) > 0 ? 'text-green-500' : Number(team.cacp) < 0 ? 'text-red-500' : 'text-on-surface-variant'
                      }`}>
                        {team.cacp}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Leyenda explicativa al pie */}
        {activeTab === 'Temporada Regular' && (
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] md:text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Puestos 1-4: Clasificación Directa a Round Robin
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Puestos 5-6: Serie Comodín
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
