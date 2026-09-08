import { NextResponse } from 'next/server';

export async function GET() {
  // En un entorno real, aquí te conectarías a una base de datos o harías web scraping
  // a una API oficial de béisbol. Por ahora, proveemos los datos estructurados.
  
  const standings = {
    'Regular': [
      { id: 1, team: 'Lara', code: 'LAR', jj: 56, jg: 30, jp: 26, ave: '.536', dif: '0', status: '*' },
      { id: 2, team: 'Margarita', code: 'MAR', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', status: '*' },
      { id: 3, team: 'Magallanes', code: 'MAG', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', status: '*' },
      { id: 4, team: 'Águilas', code: 'ZUL', jj: 56, jg: 29, jp: 27, ave: '.518', dif: '1', status: '*' },
      { id: 5, team: 'Caribes', code: 'CAR', jj: 56, jg: 28, jp: 28, ave: '.500', dif: '2', status: '#' },
      { id: 6, team: 'Aragua', code: 'ARA', jj: 56, jg: 28, jp: 28, ave: '.500', dif: '2', status: '#' },
      { id: 7, team: 'Tiburones', code: 'TIB', jj: 56, jg: 27, jp: 29, ave: '.482', dif: '3', status: '++' },
      { id: 8, team: 'Leones', code: 'LEO', jj: 56, jg: 24, jp: 32, ave: '.429', dif: '6', status: '++' },
    ],
    'Comodín': [
      { id: 5, team: 'Caribes', code: 'CAR', jj: 2, jg: 1, jp: 1, ave: '.500', dif: '0', status: '' },
      { id: 6, team: 'Aragua', code: 'ARA', jj: 2, jg: 1, jp: 1, ave: '.500', dif: '0', status: '' },
    ],
    'Round Robin': [
      { id: 1, team: 'Lara', code: 'LAR', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
      { id: 2, team: 'Margarita', code: 'MAR', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
      { id: 3, team: 'Magallanes', code: 'MAG', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
      { id: 4, team: 'Águilas', code: 'ZUL', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
      { id: 5, team: 'Caribes', code: 'CAR', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
    ],
    'Final': [
      { id: 1, team: 'Lara', code: 'LAR', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
      { id: 2, team: 'Margarita', code: 'MAR', jj: 0, jg: 0, jp: 0, ave: '.000', dif: '0', status: '' },
    ]
  };

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    standings
  });
}
