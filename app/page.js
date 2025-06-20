"use client";
import { useEffect, useState } from "react";
import CalendarWithEvents from "@/components/CalendarWithEvents";
import { NavbarDemo } from "@/components/Navbar";
import WhatsPoppinSection from "@/components/WhatsPoppinSection";
import Image from "next/image";


import dynamic from "next/dynamic";
import ShoppingSection from "@/components/ShoppingSection";
import LetsConnectSection from "@/components/LetsConnectSection";
import FooterSection from "@/components/FooterSection";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Determine San Diego time and set navbar background
  const [navbarBg, setNavbarBg] = useState("/navbar.png");

  useEffect(() => {
    // San Diego is UTC-7 (PDT) or UTC-8 (PST), but for simplicity, use UTC-7
    const getSanDiegoHour = () => {
      const now = new Date();
      // Get UTC hour and subtract 7 for PDT
      let utcHour = now.getUTCHours();
      let sanDiegoHour = utcHour - 7;
      if (sanDiegoHour < 0) sanDiegoHour += 24;
      return sanDiegoHour;
    };

    const hour = getSanDiegoHour();
    if (hour >= 6 && hour < 18) {
      setNavbarBg("/navbar1.png"); // Daytime
    } else {
      setNavbarBg("/navbar.png"); // Nighttime
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasEmail = localStorage.getItem("afrobeat_email_submitted");
      if (!hasEmail) {
        setTimeout(() => setShowModal(true), 1200);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@") || !name) {
      setError("Please enter a valid name and email.");
      return;
    }
    try {
      // Send to your email using a simple API route (you must create this route)
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
        }),
      });
      if (res.ok) {
        localStorage.setItem("afrobeat_email_submitted", "true");
        setSubmitted(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowModal(false);
          setShowConfetti(false);
        }, 2000);
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Failed to send. Please try again.");
    }
  };

  return (
    <main>
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 300}
          height={typeof window !== "undefined" ? window.innerHeight : 300}
          recycle={false}
          numberOfPieces={400}
        />
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-purple-700">Stay in the Loop!</h2>
            <p className="mb-4 text-gray-600">
              Get the latest Afrobeat news and updates straight to your inbox.
            </p>
            {submitted ? (
              <div className="text-green-600 font-semibold py-4">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="bg-purple-700 text-white rounded-full py-2 font-semibold hover:bg-purple-800 transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
        style={{ backgroundImage: `url('${navbarBg}')` }}
      >
        <NavbarDemo />
      </div>
      <CalendarWithEvents />
      <WhatsPoppinSection />
      <ShoppingSection />
      <LetsConnectSection />
      <FooterSection />
    </main>
  );
}




