import { useEffect, useMemo, useState } from "react";
import { LinkedList } from "../utils/LinkedList";
import type { CarouselType } from "../types/Movie";

const carouselItems: CarouselType[] = [
    {
        nombre: "Maratón de Star Wars",
        imageUrl: "https://imgs.search.brave.com/sPyrdS8JELq3r3goECGbKpt_i4Q6zyJdcBN3k4g91Os/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL1Mv/YXBsdXMtbWVkaWEt/bGlicmFyeS1zZXJ2/aWNlLW1lZGlhLzJm/NTNjNmIwLTFmZTYt/NDA0NC1iNTg2LWQy/OWM0YTY4Nzg3Yy5f/X0NSMCwwLDk3MCwz/MDBfUFQwX1NYOTcw/X1YxX19fLmpwZw"
    },
    {
        nombre: "Kimetsu no Yaiba: Mugen-Jō-Hen",
        imageUrl: "https://imgs.search.brave.com/DvPeZuL0BnD6gDR4yopgg94TN9sUKl3BN3vaywdqgvw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2tp/bWV0c3Utbm8teWFp/YmEvaW1hZ2VzLzkv/OTYvQmFubmVyX2Rl/X3BvcnRhZGEucG5n/L3JldmlzaW9uL2xh/dGVzdC9zY2FsZS10/by13aWR0aC1kb3du/LzEyMDA_Y2I9MjAy/NTA5MTUxODU0MTMm/cGF0aC1wcmVmaXg9/ZXM"
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