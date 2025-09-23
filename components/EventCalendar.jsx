"use client";
import { useState, useEffect } from "react";

const EventCalendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://afrobeatsandiegobackend.onrender.com/api/events"); // change this to your API endpoint
        const json = await res.json();

        // Transform API response into grouped format
        const grouped = {};
        json.data.forEach((event) => {
          const dateKey = new Date(event.date).toISOString().split("T")[0]; // "2025-09-25"
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(event);
        });

        setEvents(grouped);

        // Auto-select first available date
        const firstDate = Object.keys(grouped)[0];
        if (firstDate) setSelectedDate(firstDate);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading events...</div>;
  }

  const dates = Object.keys(events);

  return (
    <div className="min-h-screen bg-gray-100 flex p-4">
      {/* Left Sidebar: Dates */}
      <div className="w-1/4 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Pick a Day</h2>
        <ul className="space-y-2">
          {dates.length > 0 ? (
            dates.map((date) => (
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
            ))
          ) : (
            <li>No available dates</li>
          )}
        </ul>
      </div>

      {/* Right Content: Event Cards */}
      <div className="w-3/4 px-6">
        <h2 className="text-xl font-bold mb-4">
          {selectedDate
            ? `Events on ${new Date(selectedDate).toDateString()}`
            : "Select a date to see events"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedDate && events[selectedDate]?.length > 0 ? (
            events[selectedDate].map((event) => (
              <div
                key={event._id}
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
            ))
          ) : (
            <p>No events available for this day.</p>
          )}
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
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-60 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-bold">{selectedEvent.title}</h2>
            <p className="text-gray-500">{selectedEvent.time}</p>
            <p className="mt-2">{selectedEvent.description}</p>
            {selectedEvent.link && (
              <a
                href={selectedEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                Visit Link
              </a>
            )}
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
