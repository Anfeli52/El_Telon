import type { Review } from "../types/Movie";

export const sampleReviews: Review[] = [
    {
        id: -1,
        autor: "Camila Torres",
        comentario: "Me gusto mucho la historia, se siente entretenida y no se vuelve pesada.",
        calificacion: 5,
        fechaCreacion: "2026-05-22T18:20:00",
        likes: 24,
        liked: false,
        dislikes: 2,
        disliked: false,
        respuestas: [
            {
                id: -11,
                autor: "Mateo Ruiz",
                comentario: "Total, el ritmo ayuda mucho y no se siente larga.",
                calificacion: 5,
                fechaCreacion: "2026-05-22T19:05:00",
                likes: 8,
                liked: false,
                dislikes: 1,
                disliked: false,
                respuestas: [
                    {
                        id: -111,
                        autor: "Camila Torres",
                        comentario: "Si, ademas el final queda bien cerrado.",
                        calificacion: 5,
                        fechaCreacion: "2026-05-22T19:30:00",
                        likes: 3,
                        liked: false,
                        dislikes: 0,
                        disliked: false,
                        respuestas: []
                    }
                ]
            }
        ]
    },
    {
        id: -2,
        autor: "Juan Perez",
        comentario: "Buena pelicula para verla con amigos, aunque algunas escenas van algo rapido.",
        calificacion: 4,
        fechaCreacion: "2026-05-21T15:10:00",
        likes: 17,
        liked: false,
        dislikes: 3,
        disliked: false,
        respuestas: []
    },
    {
        id: -3,
        autor: "Laura Medina",
        comentario: "La fotografia esta bonita, pero el final pudo ser mas fuerte.",
        calificacion: 3,
        fechaCreacion: "2026-05-18T20:40:00",
        likes: 9,
        liked: false,
        dislikes: 4,
        disliked: false,
        respuestas: []
    },
    {
        id: -4,
        autor: "Andres Rojas",
        comentario: "La recomiendo por los personajes y por el ritmo, engancha desde el inicio.",
        calificacion: 5,
        fechaCreacion: "2026-05-23T12:35:00",
        likes: 31,
        liked: false,
        dislikes: 1,
        disliked: false,
        respuestas: []
    },
    {
        id: -5,
        autor: "Sofia Castillo",
        comentario: "No me convencio mucho, esperaba mas tension en la mitad de la pelicula.",
        calificacion: 2,
        fechaCreacion: "2026-05-20T10:15:00",
        likes: 4,
        liked: false,
        dislikes: 8,
        disliked: false,
        respuestas: []
    },
    {
        id: -6,
        autor: "Nicolas Arias",
        comentario: "Para mi se queda corta, tiene buenas ideas pero no las desarrolla bien.",
        calificacion: 1,
        fechaCreacion: "2026-05-19T14:50:00",
        likes: 2,
        liked: false,
        dislikes: 11,
        disliked: false,
        respuestas: []
    }
];
