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
      description: "Join us at the annual Tech Expo showcasing future innovations."
    },
    {
      id: 2,
      title: "UI/UX Workshop",
      time: "2:00 PM",
      thumbnail: "/event2.jpg",
      image: "/event2.jpg",
      description: "Hands-on design workshop with top industry experts."
    }
  ],
  // Add more events as needed
};

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const CalendarWithEvents = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
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
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="text-center"> </div>);
    for (let d = 1; d <= totalDays; d++) {
      const dateKey = format(new Date(year, month, d), "yyyy-MM-dd");
      days.push(
        <button
          key={d}
          onClick={() => setSelectedDate(dateKey)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            selectedDate === dateKey ? "bg-white text-black" : "hover:bg-white/20 text-white"
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
    <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-600 to-blue-600 ring-2 ring-offset-4 ring-offset-gray-900 ring-purple-500 max-w-5xl mx-auto mt-10">
      <div className="bg-black p-4 rounded-2xl flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="w-full md:w-1/3 text-white">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth}><ChevronLeft /></button>
            <h2 className="text-lg font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            <button onClick={nextMonth}><ChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center font-bold">{d}</div>
            ))}
            {renderDays()}
          </div>
        </div>

        {/* Events */}
        <div className="w-full md:w-2/3">
          <h3 className="text-white font-semibold mb-2">Events on {selectedDate}</h3>
          {selectedEvents.length === 0 ? (
            <p className="text-gray-300">No events scheduled.</p>
          ) : (
            <div className="grid gap-4">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/10 backdrop-blur-md text-white rounded-xl p-4 flex items-center gap-4 hover:bg-white/20 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <img src={event.thumbnail} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p className="text-sm text-gray-300">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <Dialog open={true} onClose={() => setSelectedEvent(null)} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-lg mx-auto z-50">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-xl mb-4" />
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