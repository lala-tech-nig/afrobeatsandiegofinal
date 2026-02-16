"use client";
import { useEffect, useState } from "react";
import CalendarWithEvents from "@/components/CalendarWithEvents";
import { NavbarDemo } from "@/components/Navbar";
import WhatsPoppinSection from "@/components/WhatsPoppinSection";
import ShoppingSection from "@/components/ShoppingSection";
import LetsConnectSection from "@/components/LetsConnectSection";
import FooterSection from "@/components/FooterSection";
import dynamic from "next/dynamic";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
import ConnectForm from "@/components/ConnectForm";
import ShoppingSectionNew from "@/components/ShoppingSectionNew";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [navbarBg, setNavbarBg] = useState("/navbar.png");
  const [modalFadeOut, setModalFadeOut] = useState(false);

  useEffect(() => {
    const getSanDiegoHour = () => {
      const now = new Date();
      let utcHour = now.getUTCHours();
      let sanDiegoHour = utcHour - 7;
      if (sanDiegoHour < 0) sanDiegoHour += 24;
      return sanDiegoHour;
    };

    const hour = getSanDiegoHour();
    if (hour >= 6 && hour < 18) {
      setNavbarBg("/navbar1.png");
    } else {
      setNavbarBg("/navbar.png");
    }

    // Show modal after 10s if not submitted before
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const submitted = localStorage.getItem("connectFormSubmitted");
        if (!submitted) setShowModal(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handler for successful form submission with fade out and 3s delay
  const handleFormSubmit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("connectFormSubmitted", "true");
    }
    setModalFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      setModalFadeOut(false);
    }, 3000); // 3 seconds transition out
  };

  return (
    <main>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
        style={{ backgroundImage: `url('${navbarBg}')` }}
      >
        <NavbarDemo />
      </div>
      <CalendarWithEvents />
      <WhatsPoppinSection />
      {/* <ShoppingSection /> */}
      <ShoppingSectionNew />
      <LetsConnectSection />
      <FooterSection />

      {/* Modal */}
      {showModal && (
        <div className={`fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-1000 ${modalFadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className={`relative w-full max-w-lg mx-4 rounded-xl shadow-lg p-6 bg-white transform transition-all duration-1000 ${modalFadeOut ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-red-600"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h1>Let's connect</h1>
            <ConnectForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </main>
  );
}




