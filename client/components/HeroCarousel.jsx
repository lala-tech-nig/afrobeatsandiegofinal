'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        fetchCarouselImages();
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    const fetchCarouselImages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/carousel');
            const data = await response.json();
            if (data.success && data.data.length > 0) {
                setImages(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch carousel images:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    if (loading || images.length === 0) {
        return null; // Don't show carousel if no images
    }

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black">
            {/* Carousel Images */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={image._id}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={image.image}
                            alt={image.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Title Overlay */}
                        {image.title && (
                            <div className="absolute bottom-8 left-8 right-8 z-20">
                                <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                                    {image.title}
                                </h2>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition duration-200"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition duration-200"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
