import type { MovieDetail } from '../types/Movie';


export const movies: MovieDetail[] = [
    {
        id: 1,
        nombre: 'Avengers: Endgame',
        descripcion:
            'Despues del chasquido de Thanos, los heroes que quedan intentan una ultima mision para recuperar lo perdido y devolver el equilibrio al universo.',
        imagen: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        categoria: 'Accion',
        fechaEstreno: '2019-04-26',
        duracion: 181,
        tituloOriginal: 'Avengers: Endgame',
        clasificacion: '12+',
        director: 'Anthony Russo, Joe Russo',
        reparto: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        dates: [
            { id: '2026-04-28', weekDay: 'LUN', dayLabel: '28 abr' },
            { id: '2026-04-29', weekDay: 'MAR', dayLabel: '29 abr' }
        ],
        schedules: {
            '2026-04-28': [
                { theater: 'Multicine Simon Bolivar', format: '2D', language: 'SUB', times: ['03:20 p. m.', '07:10 p. m.'] }
            ],
            '2026-04-29': [
                { theater: 'Multicine Centro', format: '3D', language: 'ESP', times: ['05:40 p. m.'] }
            ]
        }
    },
    {
        id: 2,
        nombre: 'John Wick 4',
        descripcion:
            'John Wick vuelve a enfrentarse a la Alta Mesa en una carrera contra el tiempo, con enemigos nuevos y viejas cuentas pendientes.',
        imagen: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        categoria: 'Accion',
        fechaEstreno: '2023-03-24',
        duracion: 169,
        tituloOriginal: 'John Wick: Chapter 4',
        clasificacion: '15+',
        director: 'Chad Stahelski',
        reparto: 'Keanu Reeves, Donnie Yen, Bill Skarsgard',
        poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        dates: [
            { id: '2026-04-28', weekDay: 'LUN', dayLabel: '28 abr' },
            { id: '2026-04-29', weekDay: 'MAR', dayLabel: '29 abr' }
        ],
        schedules: {
            '2026-04-28': [
                { theater: 'Multicine Simon Bolivar', format: '2D', language: 'SUB', times: ['06:15 p. m.', '09:00 p. m.'] }
            ],
            '2026-04-29': [
                { theater: 'Multicine Centro', format: '2D', language: 'ESP', times: ['05:10 p. m.'] }
            ]
        }
    }
];