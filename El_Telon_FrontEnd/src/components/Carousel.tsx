import { useEffect, useMemo, useState } from "react";
import { LinkedList } from "../utils/LinkedList";
import type { CarouselType } from "../types/Movie";

const carouselItems: CarouselType[] = [
    {
        nombre: "Maratón de Star Wars",
        imageUrl: "https://imgs.search.brave.com/sPyrdS8JELq3r3goECGbKpt_i4Q6zyJdcBN3k4g91Os/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL1Mv/YXBsdXMtbWVkaWEt/bGlicmFyeS1zZXJ2/aWNlLW1lZGlhLzJm/NTNjNmIwLTFmZTYt/NDA0NC1iNTg2LWQy/OWM0YTY4Nzg3Yy5f/X0NSMCwwLDk3MCwz/MDBfUFQwX1NYOTcw/X1YxX19fLmpwZw"
    },
    {
        nombre: "Maratón de Marvel",
        imageUrl: "https://imgs.search.brave.com/9n2l8sXo7m1a3j5e9h0qj6kKZtH4n2u8b5sN8vVhQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL1Mv/YXBsdXMtbWVkaWEt/bGlicmFyeS1zZXJ2/aWNlLW1lZGlhLzE4/ODg3YjA4LTQyYjAt/NDA0NC05ODg3LWQy/OWM0YTY4Nzg3Yy5f/X0NSMCwwLDk3MCwz/MDBfUFQwX1NYOTcw"
    }
];

export const Carousel = () => {
    const carouselList = useMemo(() => {
        const list = new LinkedList();
        carouselItems.forEach((item) => list.append(item));
        return list;
    }, []);

    const [carousel, setCarousel] = useState(carouselList.getHead());

    useEffect(() => {
        setCarousel(carouselList.getHead());
    }, [carouselList]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarousel((prev) => {
                if(prev && prev.next) {
                    return prev.next;
                }
                return carouselList.getHead();
            })
        }, 3000);

        return () => clearInterval(interval);
    }, [carouselList]);

    return (
        <div className="carousel-container">
            {carousel && (
                <div className="carousel-item">
                    <img src={carousel.value.imageUrl} alt={carousel.value.nombre} className="carousel-image" />
                    <div className="carousel-content">
                        <h3 className="carousel-title">{carousel.value.nombre}</h3>
                    </div>
                </div>
            )}
        </div>
    );

}