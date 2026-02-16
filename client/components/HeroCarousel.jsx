'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

export default function HeroCarousel() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCarouselImages();
    }, []);

    const fetchCarouselImages = async () => {
        try {
            const response = await fetch('https://afrobeatsandiegofinal.onrender.com/api/carousel');
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setImages(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch carousel images:', error);
        } finally {
            setLoading(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        fade: true,
        appendDots: dots => (
            <div style={{ bottom: "20px" }}>
                <ul className="m-0 flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className={`w-3 h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white`}></div>
        )
    };

    if (loading || images.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 mb-8">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-black shadow-xl">
                <Slider {...settings} className="h-full">
                    {images.map((img, index) => (
                        <div key={img._id || index} className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={img.image}
                                alt={img.title || `Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                            {/* Title Overlay */}
                        </div>
                    ))}
                </Slider>

                <style jsx global>{`
                .slick-dots li {
                    margin: 0;
                    width: auto;
                    height: auto;
                }
                .slick-dots li.slick-active div {
                    background-color: white;
                    width: 2rem;
                }
            `}</style>
            </div>
        </div>
    );
}
