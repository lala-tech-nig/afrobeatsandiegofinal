'use client';

import { LensDemoThird } from './ShoppingCard'

const links = [
  'https://example.com/1',
  'https://example.com/2',
  'https://example.com/3',
  'https://example.com/4',
  'https://example.com/5',
  'https://example.com/6',
];

const ShoppingSection = () => {
  return (
    <section className="bg-gray-100 py-8 px-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">SHOP FROM US</h2>
      <div className="flex flex-wrap -mx-2">
        {links.map((link, idx) => (
          <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 flex justify-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div style={{ transform: "scale(0.9)" }}>
                <LensDemoThird />
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShoppingSection