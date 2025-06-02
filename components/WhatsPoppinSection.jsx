import React from 'react'

const WhatsPoppinSection = () => {
  return (
    <div
  className="w-full bg-cover bg-center bg-no-repeat py-16 px-6 text-white"
  style={{ backgroundImage: `url('/africabg.png')` }}
>
  <div className="max-w-5xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Event</h1>
    <p className="text-lg md:text-xl max-w-2xl mx-auto">
      Join us for an unforgettable experience with live music, engaging activities, and more.
    </p>
    <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
      Learn More
    </button>
  </div>
</div>

  )
}

export default WhatsPoppinSection