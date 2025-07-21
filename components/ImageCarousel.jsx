// components/ImageCarousel.js
'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

export default function ImageCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('https://afrobeatsandiegobackend.onrender.com/api/carousel')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-5xl px-4 mb-8">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={img._id || index}>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={`https://afrobeatsandiegobackend.onrender.com${img.imageUrl}`}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
