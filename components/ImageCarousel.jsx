// components/ImageCarousel.js
'use client';

import Slider from 'react-slick';
import Image from 'next/image';

const images = [
  '/slide1.jpg',
  '/slide2.jpg',
  '/slide3.jpg',
];

export default function ImageCarousel() {
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
        {images.map((src, index) => (
          <div key={index}>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
