"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import WeatherTimeWidget from "./WeatherTimeWidget";
import SpotifyPlaylistEmbed from "./Player";
import { Dialog } from "@headlessui/react";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Playlist", link: "#playlist" },
    { name: "Events", link: "#event" },
    { name: "Shop", link: "#shop" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal and Toast State
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastName, setToastName] = useState("");
  const toastTimeout = useRef(null);

  // Handle form input
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit with API call
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://afrobeatsandiegobackend.onrender.com/api/forms/book-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setShowModal(false);
      setToastName(form.fullName);
      setShowToast(true);
      setForm({ fullName: "", email: "", phoneNumber: "", message: "" });
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setShowToast(false), 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <WeatherTimeWidget />
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" onClick={() => setShowModal(true)}>
              Book a call
            </NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowModal(true);
                }}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
        <div className="relative bg-white rounded-2xl p-4 sm:p-8 max-w-xs sm:max-w-md w-[95vw] sm:w-full mx-auto z-50 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-center text-purple-700">Book a Call</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Your Name"
              value={form.fullName}
              onChange={handleFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200 text-black" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white font-bold">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in-up">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"></path>
          </svg>
          <span className="font-semibold">Thank you, {toastName}! Our team will reach out to you soon.</span>
        </div>
      )}

      <div className="w-full flex flex-col items-center px-4 py-8 space-y-8">
        <div className="mt-14">
          <SpotifyPlaylistEmbed />
        </div>
        <ImageCarousel />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold">Check the navbar at the top of the container</h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        For demo purpose we have kept the position as <span className="font-medium">Sticky</span>. Keep in mind that this
        component is <span className="font-medium">fixed</span> and will not move when scrolling.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1,2,3,4,5,6,7,8,9,10].map(id => (
          <div key={id} className="md:col-span-1 h-60 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-medium">Box {id}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
