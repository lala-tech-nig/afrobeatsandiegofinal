// CalendarWithEvents.jsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = {
  "2025-06-02": [
    {
      id: 1,
      title: "Tech Expo 2025",
      time: "10:00 AM",
      thumbnail: "/event1.jpg",
      image: "/event1.jpg",
      description:
        "Join us at the annual Tech Expo showcasing future innovations.",
    },
    {
      id: 2,
      title: "UI/UX Workshop",
      time: "2:00 PM",
      thumbnail: "/event2.jpg",
      image: "/event2.jpg",
      description: "Hands-on design workshop with top industry experts.",
    },
  ],
  // Add more events as needed
};

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const CalendarWithEvents = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(month, year);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++)
      days.push(
        <div key={`empty-${i}`} className="text-center">
          {" "}
        </div>
      );
    for (let d = 1; d <= totalDays; d++) {
      const dateKey = format(new Date(year, month, d), "yyyy-MM-dd");
      days.push(
        <button
          key={d}
          onClick={() => setSelectedDate(dateKey)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            selectedDate === dateKey
              ? "bg-white text-black"
              : "hover:bg-white/20 text-white"
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const selectedEvents = events[selectedDate] || [];

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat p-8 mx-auto mt-0"
      style={{ backgroundImage: `url('/africabg.png')` }}
    >
      <div className="bg-black p-2 rounded-2xl flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="w-full md:w-1/3 text-white">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth}>
              <ChevronLeft />
            </button>
            <h2 className="text-lg font-bold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button onClick={nextMonth}>
              <ChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center font-bold">
                {d}
              </div>
            ))}
            {renderDays()}
          </div>
        </div>

        {/* Events */}
        <div className="w-full md:w-2/3">
          <h3 className="text-white font-semibold mb-2">
            Events on {selectedDate}
          </h3>
          {selectedEvents.length === 0 ? (
            <p className="text-gray-300">No events scheduled.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 shadow-lg cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <div className="bg-white rounded-2xl p-4 h-full flex flex-col">
                    {/* Event Image */}
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-40 object-contain rounded-xl"
                    />

                    {/* Event Title */}
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>

                    {/* Event Time */}
                    <p className="text-sm text-gray-500 mt-1">{event.time}</p>

                    {/* Optional CTA */}
                    <button className="mt-4 self-start px-4 py-1.5 rounded-full bg-black text-white font-semibold text-sm inline-flex items-center gap-2">
                      View details
                      <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full font-bold">
                        Free
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <Dialog
          open={true}
          onClose={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-lg mx-auto z-50">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedEvent.time}</p>
            <p className="text-gray-800">{selectedEvent.description}</p>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarWithEvents;
