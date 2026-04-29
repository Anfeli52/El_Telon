export interface Movie {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria: string;
    fechaEstreno: string;
    duracion: number;
}

export interface MovieDateOption {
    id: string;
    weekDay: string;
    dayLabel: string;
}

export interface MovieShowtimeGroup {
    theater: string;
    format: string;
    language: string;
    times: string[];
}

export interface MovieDetail extends Movie {
    tituloOriginal: string;
    clasificacion: string;
    director: string;
    reparto: string;
    poster: string;
    dates: MovieDateOption[];
    schedules: Record<string, MovieShowtimeGroup[]>;
}
