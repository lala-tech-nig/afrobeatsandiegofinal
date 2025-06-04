import React from "react";
import { ThreeDCardDemo } from "./ShoppingCard";

const SHOPIFY_STORE_URL = "https://your-shopify-store.myshopify.com"; // Replace with your actual Shopify store URL

const ShoppingSection = () => {
  // Create an array for 6 cards
  const cards = Array.from({ length: 6 });

  return (
    <section
      className=" rounded-2xl py-4 px-4 w-[98%] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/navbar.png')" }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-800 drop-shadow">
          Shop
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((_, i) => (
            <div
              key={i}
              className="cursor-pointer transition-transform hover:scale-105 flex justify-center m-0"
              onClick={() => window.open(SHOPIFY_STORE_URL, "_blank")}
              tabIndex={0}
              role="button"
              aria-label="Visit store item"
            >
              <div className="w-auto sm:w-44 md:w-48 m-0">
                <ThreeDCardDemo />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
            onClick={() => window.open(SHOPIFY_STORE_URL, "_blank")}
          >
            Visit Our Store
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingSection;