export type Movie = {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria: string;
    fechaEstreno: string;
    duracion: number;
}

export type CarouselType = {
    nombre: string;
    imageUrl: string;
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

export interface MovieShowtimeResponse {
    dates: MovieDateOption[];
    schedules: Record<string, MovieShowtimeGroup[]>;
}