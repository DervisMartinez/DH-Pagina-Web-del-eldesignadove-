import { NextResponse } from 'next/server';

export async function GET() {
  // En un entorno real, aquí te conectarías a una base de datos o harías web scraping
  // a una API oficial de béisbol. Por ahora, proveemos los datos estructurados.
  
  const standings = {
    'Temporada Regular': [
      { id: 1, team: 'Cardenales de Lara', code: 'LAR', jj: 56, jg: 30, jp: 26, ave: '.536', dif: '0', racha: 'P1', ult10: '6 - 4', casa: '16 - 12', ruta: '14 - 14', ca: 352, cp: 307, cacp: 45, status: '*' },
      { id: 2, team: 'Bravos de Margarita', code: 'MAR', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', racha: 'P6', ult10: '3 - 7', casa: '16 - 12', ruta: '13 - 15', ca: 308, cp: 295, cacp: 13, status: '*' },
      { id: 3, team: 'Navegantes del Magallanes', code: 'MAG', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', racha: 'G3', ult10: '7 - 3', casa: '18 - 10', ruta: '11 - 17', ca: 309, cp: 277, cacp: 32, status: '*' },
      { id: 4, team: 'Águilas del Zulia', code: 'ZUL', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', racha: 'G1', ult10: '6 - 4', casa: '16 - 12', ruta: '13 - 15', ca: 261, cp: 337, cacp: -76, status: '*' },
      { id: 5, team: 'Caribes de Anzoátegui', code: 'CAR', jj: 56, jg: 28, jp: 28, ave: '.500', dif: '2', racha: 'P1', ult10: '4 - 6', casa: '18 - 10', ruta: '10 - 18', ca: 349, cp: 326, cacp: 23, status: '#' },
      { id: 6, team: 'Tigres de Aragua', code: 'ARA', jj: 56, jg: 28, jp: 28, ave: '.500', dif: '2', racha: 'G3', ult10: '4 - 6', casa: '19 - 9', ruta: '9 - 19', ca: 282, cp: 280, cacp: 2, status: '#' },
      { id: 7, team: 'Tiburones de La Guaira', code: 'TIB', jj: 56, jg: 27, jp: 29, ave: '.482', dif: '3', racha: 'G1', ult10: '5 - 5', casa: '14 - 14', ruta: '13 - 15', ca: 318, cp: 320, cacp: -2, status: '++' },
      { id: 8, team: 'Leones del Caracas', code: 'LEO', jj: 56, jg: 24, jp: 32, ave: '.429', dif: '6', racha: 'P2', ult10: '3 - 7', casa: '14 - 14', ruta: '10 - 18', ca: 319, cp: 356, cacp: -37, status: '++' },
    ],
    'Series Particulares': [],
    'Play Offs / Comodín': [
      { id: 5, team: 'Caribes de Anzoátegui', code: 'CAR', jj: 2, jg: 1, jp: 1, ave: '.500', dif: '0', racha: 'G1', ult10: '1 - 1', casa: '1 - 1', ruta: '0 - 0', ca: 17, cp: 17, cacp: 0, status: '*' },
      { id: 6, team: 'Tigres de Aragua', code: 'ARA', jj: 2, jg: 1, jp: 1, ave: '.500', dif: '0', racha: 'P1', ult10: '1 - 1', casa: '0 - 0', ruta: '1 - 1', ca: 17, cp: 17, cacp: 0, status: '++' },
    ],
    'Round Robin': [
      { id: 1, team: 'Navegantes del Magallanes', code: 'MAG', status: '*', jj: 16, jg: 10, jp: 6, ave: '.625', dif: '0', racha: 'G7', ult10: '9 - 1', casa: '4 - 4', ruta: '6 - 2', ca: 98, cp: 93, cacp: 5 },
      { id: 2, team: 'Caribes de Anzoátegui', code: 'CAR', status: '*', jj: 16, jg: 10, jp: 6, ave: '.625', dif: '0', racha: 'P1', ult10: '6 - 4', casa: '5 - 3', ruta: '5 - 3', ca: 109, cp: 82, cacp: 27 },
      { id: 3, team: 'Cardenales de Lara', code: 'LAR', status: '++', jj: 16, jg: 9, jp: 7, ave: '.563', dif: '1', racha: 'G1', ult10: '5 - 5', casa: '5 - 3', ruta: '4 - 4', ca: 123, cp: 86, cacp: 37 },
      { id: 4, team: 'Águilas del Zulia', code: 'ZUL', status: '++', jj: 16, jg: 7, jp: 9, ave: '.438', dif: '3', racha: 'P3', ult10: '3 - 7', casa: '3 - 5', ruta: '4 - 4', ca: 78, cp: 99, cacp: -21 },
      { id: 5, team: 'Bravos de Margarita', code: 'MAR', status: '++', jj: 16, jg: 4, jp: 12, ave: '.250', dif: '6', racha: 'P1', ult10: '2 - 8', casa: '1 - 7', ruta: '3 - 5', ca: 83, cp: 131, cacp: -48 },
    ],
    'Final': [
      { id: 3, team: 'Navegantes del Magallanes', code: 'MAG', jj: 6, jg: 4, jp: 2, ave: '.667', dif: '0', racha: 'G1', ult10: '4 - 2', casa: '1 - 2', ruta: '3 - 0', ca: 53, cp: 30, cacp: 23, status: '' },
      { id: 5, team: 'Caribes de Anzoátegui', code: 'CAR', jj: 6, jg: 2, jp: 4, ave: '.333', dif: '2', racha: 'P1', ult10: '2 - 4', casa: '0 - 3', ruta: '2 - 1', ca: 30, cp: 53, cacp: -23, status: '' },
    ]
  };

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    standings
  });
}
