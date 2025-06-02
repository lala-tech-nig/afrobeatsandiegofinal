import CalendarWithEvents from "@/components/CalendarWithEvents";
import { NavbarDemo } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-[url('/navbar.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center">
          <NavbarDemo />
      </div>
      <CalendarWithEvents />
    </main>
  );
}




