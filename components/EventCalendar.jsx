"use client";
import { useState } from "react";

const mockEvents = {
  "2025-06-01": [
    {
      id: 1,
      title: "Tech Conference",
      time: "10:00 AM",
      image: "/event1.jpg",
      description: "An annual conference showcasing the latest in technology."
    },
    {
      id: 2,
      title: "Startup Pitch",
      time: "3:00 PM",
      image: "/event2.jpg",
      description: "Pitch event for emerging startups to get funded."
    }
  ],
  "2025-06-02": [
    {
      id: 3,
      title: "Design Hackathon",
      time: "12:00 PM",
      image: "/event3.jpg",
      description: "A creative event for UI/UX designers."
    }
  ]
};

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("2025-06-01");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dates = Object.keys(mockEvents);

  return (
    <div className="min-h-screen bg-gray-100 flex p-4">
      {/* Left Sidebar: Dates */}
      <div className="w-1/4 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Pick a Day</h2>
        <ul className="space-y-2">
          {dates.map(date => (
            <li
              key={date}
              className={`p-2 rounded cursor-pointer ${
                selectedDate === date
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {new Date(date).toDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content: Event Cards */}
      <div className="w-3/4 px-6">
        <h2 className="text-xl font-bold mb-4">
          Events on {new Date(selectedDate).toDateString()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEvents[selectedDate]?.map(event => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.time}</p>
            </div>
          )) || <p>No events available for this day.</p>}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-60 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-bold">{selectedEvent.title}</h2>
            <p className="text-gray-500">{selectedEvent.time}</p>
            <p className="mt-2">{selectedEvent.description}</p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
