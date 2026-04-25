export type Movie = {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    fechaEstreno: string;
    duracion: number;
    activo: boolean;
}

export type CarouselType = {
    nombre: string;
    imageUrl: string;
}