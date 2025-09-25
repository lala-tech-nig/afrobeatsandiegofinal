"use client";
import { useState, useEffect } from "react";

const EventCalendar = () => {
  const [eventsByDate, setEventsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://afrobeatsandiegobackend.onrender.com/api/events");
        const result = await res.json();

        if (result?.data) {
          // Group events by date (YYYY-MM-DD)
          const grouped = result.data.reduce((acc, event) => {
            const dateKey = new Date(event.date).toISOString().split("T")[0];
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push({
              id: event._id,
              title: event.title,
              time: event.time,
              image: event.image,
              description: event.description,
              link: event.link,
            });
            return acc;
          }, {});

          setEventsByDate(grouped);

          // Auto select the first available date
          const firstDate = Object.keys(grouped)[0];
          if (firstDate) setSelectedDate(firstDate);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading events...</div>;
  }

  const dates = Object.keys(eventsByDate);

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
            <p>No event dates available.</p>
          )}
        </ul>
      </div>

      {/* Right Content: Event Cards */}
      <div className="w-3/4 px-6">
        <h2 className="text-xl font-bold mb-4">
          {selectedDate
            ? `Events on ${new Date(selectedDate).toDateString()}`
            : "Select a date"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedDate && eventsByDate[selectedDate]?.length > 0 ? (
            eventsByDate[selectedDate].map((event) => (
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
                className="mt-3 inline-block text-blue-600 underline"
              >
                View More
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
