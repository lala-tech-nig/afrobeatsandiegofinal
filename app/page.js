import CalendarWithEvents from "@/components/CalendarWithEvents";
import { NavbarDemo } from "@/components/Navbar";
import WhatsPoppinSection from "@/components/WhatsPoppinSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-[url('/navbar.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center">
          <NavbarDemo />
      </div>
      <CalendarWithEvents />
      <WhatsPoppinSection />
    </main>
  );
}




