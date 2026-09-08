'use client';

import { useEffect, useState } from 'react';

interface TeamStanding {
  id: number;
  team: string;
  code: string;
  jj: number;
  jg: number;
  jp: number;
  ave: string;
  dif: string;
  status: string;
}

interface StandingsData {
  updatedAt: string;
  season: string;
  standings: TeamStanding[];
}

export function StandingsTable() {
  const [data, setData] = useState<StandingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Regular');

  const tabs = ['Regular', 'Comodín', 'Round Robin', 'Final'];

  useEffect(() => {
    // Simulando actualización en tiempo real con polling cada 30 segundos
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lvbp-standings');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching standings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface-container-low rounded-2xl shadow-2xl overflow-hidden border border-surface-container-highest">
      <div className="p-6 md:p-8 bg-surface-container">
        <h2 className="font-headline-lg text-[24px] md:text-headline-lg text-primary font-bold tracking-tight mb-6">
          Posiciones LVBP
        </h2>
        
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
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-surface-container-highest text-on-surface-variant font-label-caps text-[10px] md:text-label-caps uppercase tracking-wider">
                <th className="py-4 px-4 font-medium">Equipo</th>
                <th className="py-4 px-2 text-center font-medium">JJ</th>
                <th className="py-4 px-2 text-center font-medium">JG</th>
                <th className="py-4 px-2 text-center font-medium">JP</th>
                <th className="py-4 px-2 text-center font-medium">AVE</th>
                <th className="py-4 px-4 text-center font-medium">DIF.</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant animate-pulse">
                    Actualizando posiciones en tiempo real...
                  </td>
                </tr>
              ) : (
                data?.standings.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className={`border-b border-surface-container-lowest hover:bg-surface-container transition-colors ${
                      index < 4 ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {team.code}
                      </div>
                      <span className="text-secondary font-medium mr-1">{team.status}</span>
                      <span className="text-on-surface font-bold md:text-body-lg">{team.team}</span>
                    </td>
                    <td className="py-4 px-2 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.jj}</td>
                    <td className="py-4 px-2 text-center text-on-surface font-stat-numeric text-[15px]">{team.jg}</td>
                    <td className="py-4 px-2 text-center text-on-surface-variant font-stat-numeric text-[15px]">{team.jp}</td>
                    <td className="py-4 px-2 text-center text-primary font-stat-numeric text-[15px] font-medium">{team.ave}</td>
                    <td className="py-4 px-4 text-center text-on-surface font-stat-numeric text-[16px] font-bold">{team.dif}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] md:text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">*</span> Clasificado al Round Robin</span>
          <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">#</span> Puestos de Comodín</span>
          <span className="flex items-center gap-1.5"><span className="text-secondary font-bold">++</span> Eliminados</span>
        </div>
      </div>
    </div>
  );
}
