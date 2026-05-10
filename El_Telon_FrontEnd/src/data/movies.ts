import type { MovieDetail } from '../types/Movie';

export const movies: MovieDetail[] = [
    {
        id: 1,
        nombre: 'Avengers: Endgame',
        descripcion: 'Los Avengers enfrentan su batalla final.',
        imagen: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        categoria: 'Accion',
        fechaEstreno: '2019-04-26',
        duracion: 181,
        tituloOriginal: 'Avengers: Endgame',
        clasificacion: '12+',
        director: 'Anthony Russo, Joe Russo',
        reparto: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 1, time: '1:10 pm', room: 'sala 1' }, { id: 2, time: '6:40 pm', room: 'sala 2' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 3, time: '9:10 pm', room: 'sala 3' }] }]
        }
    },
    {
        id: 2,
        nombre: 'John Wick 4',
        descripcion: 'John Wick regresa en una nueva mision.',
        imagen: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        categoria: 'Accion',
        fechaEstreno: '2023-03-24',
        duracion: 169,
        tituloOriginal: 'John Wick 4',
        clasificacion: '15+',
        director: 'Chad Stahelski',
        reparto: 'Keanu Reeves, Donnie Yen, Bill Skarsgard',
        poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 4, time: '3:20 pm', room: 'sala 3' }, { id: 5, time: '8:30 pm', room: 'sala 1' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 6, time: '5:50 pm', room: 'sala 2' }] }]
        }
    },
    {
        id: 3,
        nombre: 'Interstellar',
        descripcion: 'Un viaje espacial para salvar a la humanidad.',
        imagen: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        categoria: 'Ciencia Ficcion',
        fechaEstreno: '2014-11-07',
        duracion: 169,
        tituloOriginal: 'Interstellar',
        clasificacion: '12+',
        director: 'Christopher Nolan',
        reparto: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 7, time: '4:00 pm', room: 'sala 2' }, { id: 8, time: '7:10 pm', room: 'sala 3' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 9, time: '9:40 pm', room: 'sala 1' }] }]
        }
    },
    {
        id: 4,
        nombre: 'Dune: Part Two',
        descripcion: 'Paul Atreides continua su destino en Arrakis.',
        imagen: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        categoria: 'Ciencia Ficcion',
        fechaEstreno: '2024-03-01',
        duracion: 166,
        tituloOriginal: 'Dune: Part Two',
        clasificacion: '12+',
        director: 'Denis Villeneuve',
        reparto: 'Timothee Chalamet, Zendaya, Rebecca Ferguson',
        poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 10, time: '2:30 pm', room: 'sala 1' }, { id: 11, time: '9:00 pm', room: 'sala 2' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 12, time: '6:20 pm', room: 'sala 3' }] }]
        }
    },
    {
        id: 5,
        nombre: 'The Conjuring',
        descripcion: 'Investigadores paranormales enfrentan una presencia oscura.',
        imagen: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
        categoria: 'Terror',
        fechaEstreno: '2013-07-19',
        duracion: 112,
        tituloOriginal: 'The Conjuring',
        clasificacion: '15+',
        director: 'James Wan',
        reparto: 'Vera Farmiga, Patrick Wilson, Lili Taylor',
        poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 13, time: '6:10 pm', room: 'sala 3' }, { id: 14, time: '10:10 pm', room: 'sala 1' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 15, time: '8:00 pm', room: 'sala 2' }] }]
        }
    },
    {
        id: 6,
        nombre: 'Smile',
        descripcion: 'Una fuerza aterradora comienza a perseguir a una doctora.',
        imagen: 'https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg',
        categoria: 'Terror',
        fechaEstreno: '2022-09-30',
        duracion: 115,
        tituloOriginal: 'Smile',
        clasificacion: '15+',
        director: 'Parker Finn',
        reparto: 'Sosie Bacon, Jessie T. Usher, Kyle Gallner',
        poster: 'https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 16, time: '5:20 pm', room: 'sala 1' }, { id: 17, time: '9:30 pm', room: 'sala 2' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 18, time: '7:40 pm', room: 'sala 3' }] }]
        }
    },
    {
        id: 7,
        nombre: 'Toy Story 4',
        descripcion: 'Woody y sus amigos viven una nueva aventura.',
        imagen: 'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
        categoria: 'Animacion',
        fechaEstreno: '2019-06-21',
        duracion: 100,
        tituloOriginal: 'Toy Story 4',
        clasificacion: 'todo publico',
        director: 'Josh Cooley',
        reparto: 'Tom Hanks, Tim Allen, Annie Potts',
        poster: 'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 19, time: '12:00 pm', room: 'sala 2' }, { id: 20, time: '3:10 pm', room: 'sala 3' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 21, time: '1:30 pm', room: 'sala 1' }] }]
        }
    },
    {
        id: 8,
        nombre: 'Spider-Man: Into the Spider-Verse',
        descripcion: 'Miles Morales descubre el multiverso arana.',
        imagen: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
        categoria: 'Animacion',
        fechaEstreno: '2018-12-14',
        duracion: 117,
        tituloOriginal: 'Spider-Man: Into the Spider-Verse',
        clasificacion: '7+',
        director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
        reparto: 'Shameik Moore, Jake Johnson, Hailee Steinfeld',
        poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 22, time: '2:40 pm', room: 'sala 3' }, { id: 23, time: '6:20 pm', room: 'sala 1' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 24, time: '4:50 pm', room: 'sala 2' }] }]
        }
    },
    {
        id: 9,
        nombre: 'Titanic',
        descripcion: 'Una historia de amor durante una tragedia maritima.',
        imagen: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
        categoria: 'Romance',
        fechaEstreno: '1997-12-19',
        duracion: 194,
        tituloOriginal: 'Titanic',
        clasificacion: '12+',
        director: 'James Cameron',
        reparto: 'Leonardo DiCaprio, Kate Winslet, Billy Zane',
        poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 25, time: '4:30 pm', room: 'sala 1' }, { id: 26, time: '8:10 pm', room: 'sala 2' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 27, time: '6:00 pm', room: 'sala 3' }] }]
        }
    },
    {
        id: 10,
        nombre: 'La La Land',
        descripcion: 'Dos artistas luchan por sus suenos y su amor.',
        imagen: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        categoria: 'Romance',
        fechaEstreno: '2016-12-09',
        duracion: 128,
        tituloOriginal: 'La La Land',
        clasificacion: '12+',
        director: 'Damien Chazelle',
        reparto: 'Ryan Gosling, Emma Stone, John Legend',
        poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        dates: [{ id: '2026-05-01', weekDay: 'vie', dayLabel: '1 may' }, { id: '2026-05-02', weekDay: 'sab', dayLabel: '2 may' }],
        schedules: {
            '2026-05-01': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 28, time: '3:50 pm', room: 'sala 2' }, { id: 29, time: '7:50 pm', room: 'sala 3' }] }],
            '2026-05-02': [{ theater: 'multiplex', format: '2d', language: 'dob', times: [{ id: 30, time: '9:20 pm', room: 'sala 1' }] }]
        }
    }
];
