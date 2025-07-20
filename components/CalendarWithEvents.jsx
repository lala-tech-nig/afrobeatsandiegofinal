// CalendarWithEvents.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = {
  "2025-07-21": [
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
    "2025-07-24": [
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
    "2025-07-26": [
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
    "2025-07-30": [
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
  const [selectedDay, setSelectedDay] = useState(format(today, "EEEE"));
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Modal state for add event
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    eventTitle: "",
    eventDetails: "",
    eventDate: "",
    phone: "",
    location: "",
    image: null,
    imageUrl: "",
  });

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef(null);

  // Update selectedDay whenever selectedDate changes
  useEffect(() => {
    const dateObj = new Date(selectedDate);
    setSelectedDay(format(dateObj, "EEEE"));
  }, [selectedDate]);

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
      const dateObj = new Date(year, month, d);
      const dateKey = format(dateObj, "yyyy-MM-dd");
      const hasEvent = !!events[dateKey] && events[dateKey].length > 0;
      days.push(
        <div key={d} className="flex flex-col items-center">
          <button
            onClick={() => setSelectedDate(dateKey)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition mb-0.5 ${
              selectedDate === dateKey
                ? "bg-white text-black"
                : "hover:bg-white/20 text-white"
            }`}
          >
            {d}
          </button>
          {hasEvent && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold mt-0.5">
              event
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  const selectedEvents = events[selectedDate] || [];

  // Handle Add Event Form
  const handleAddFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setAddForm((prev) => ({
        ...prev,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setAddForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setAddForm({
      name: "",
      email: "",
      eventTitle: "",
      eventDetails: "",
      eventDate: "",
      phone: "",
      location: "",
      image: null,
      imageUrl: "",
    });
    setShowToast(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setShowToast(false), 4000);
  };

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
            Events on {selectedDay}, {selectedDate}
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

      {/* Add Event Button */}
      <div className="flex justify-center mt-8">
        <button
          className="relative px-8 py-3 rounded-2xl font-bold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-pink-300 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500"
          onClick={() => setShowAddModal(true)}
        >
          <span className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none bg-gradient-to-r from-white via-white/60 to-white/10"></span>
          <span className="relative z-10">
            Click to add your own event on our calendar
          </span>
        </button>
      </div>

      {/* Add Event Modal */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        ></div>
        <div className="relative bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-lg w-[95vw] sm:w-full mx-auto z-50
    max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Add Your Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={addForm.name}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={addForm.email}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="text"
              name="eventTitle"
              placeholder="Event Title"
              value={addForm.eventTitle}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <textarea
              name="eventDetails"
              placeholder="Event Details"
              value={addForm.eventDetails}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="date"
              name="eventDate"
              placeholder="Event Date"
              value={addForm.eventDate}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={addForm.phone}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={addForm.location}
              onChange={handleAddFormChange}
              className="w-full p-3 rounded-md border border-purple-500"
              required
            />
            <div>
              <label className="block mb-1 font-semibold">Event Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleAddFormChange}
                className="w-full"
                required
              />
              {addForm.imageUrl && (
                <img
                  src={addForm.imageUrl}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-black"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-purple-600 text-white font-bold"
              >
                Submit Event
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in-up">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"></path></svg>
          <span className="font-semibold">Event successfully submitted! Our team will get back to you.</span>
        </div>
      )}

      {/* Event Details Modal */}
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
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{selectedEvent.time}</p>
            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{selectedEvent.location}</span>
              <span>{selectedEvent.phone}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full px-4 py-2 rounded-md bg-purple-600 text-white font-semibold transition hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarWithEvents;
