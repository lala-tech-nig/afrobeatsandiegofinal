// CalendarWithEvents.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const CalendarWithEvents = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedDay, setSelectedDay] = useState(format(today, "EEEE"));
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Events state from API
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://afrobeatsandiegofinal.onrender.com/api/events"
        );
        const json = await res.json();

        if (json?.data) {
          // Group events by date (yyyy-MM-dd)
          const grouped = {};
          json.data.forEach((event) => {
            const dateKey = format(new Date(event.date), "yyyy-MM-dd");
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push({
              id: event._id,
              title: event.title,
              time: event.time,
              thumbnail: event.thumnail || event.image,
              image: event.image,
              link: event.link,
              description: event.description,
              location: event.location || "",
              phone: event.phone || "",
            });
          });
          setEvents(grouped);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
      days.push(<div key={`empty-${i}`} className="text-center"></div>);

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      const dateKey = format(dateObj, "yyyy-MM-dd");
      const hasEvent = !!events[dateKey] && events[dateKey].length > 0;

      days.push(
        <div key={d} className="flex flex-col items-center">
          <button
            onClick={() => setSelectedDate(dateKey)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition mb-0.5 ${selectedDate === dateKey
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

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addForm.name);
    formData.append("email", addForm.email);
    formData.append("eventTitle", addForm.eventTitle);
    formData.append("eventDetails", addForm.eventDetails);
    formData.append("eventDate", addForm.eventDate);
    formData.append("phone", addForm.phone);
    formData.append("location", addForm.location);
    if (addForm.image) formData.append("image", addForm.image);

    try {
      await fetch("http://localhost:5000/api/calendar", {
        method: "POST",
        body: formData,
      });
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
    } catch (error) {
      alert("Failed to submit event. Please try again.");
    }
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

          {/* Add Event Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold shadow hover:opacity-90"
          >
            Click to add your own event on our calendar
          </button>
        </div>

        {/* Events */}
        <div className="w-full md:w-2/3">
          <h3 className="text-white font-semibold mb-2">
            Events on {selectedDay}, {selectedDate}
          </h3>
          {loading ? (
            <p className="text-gray-300">Loading events...</p>
          ) : selectedEvents.length === 0 ? (
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
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-40 object-contain rounded-xl"
                    />
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{event.time}</p>
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

      {/* Event Details Modal */}
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <DialogPanel className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-56 object-contain rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-600 mt-2">{selectedEvent.description}</p>
              <p className="text-gray-800 mt-2">
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p className="text-gray-800">
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <a
                href={selectedEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-full"
              >
                Go to Event
              </a>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </>
          )}
        </DialogPanel>
      </Dialog>

      {/* Add Event Modal */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <DialogPanel className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Add Your Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={addForm.name}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={addForm.email}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="eventTitle"
              placeholder="Event Title"
              value={addForm.eventTitle}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="eventDetails"
              placeholder="Event Details"
              value={addForm.eventDetails}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              name="eventDate"
              value={addForm.eventDate}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={addForm.phone}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={addForm.location}
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleAddFormChange}
              className="w-full border p-2 rounded"
            />
            {addForm.imageUrl && (
              <img
                src={addForm.imageUrl}
                alt="Preview"
                className="w-full h-40 object-contain rounded"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded"
              >
                Submit Event
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Event submitted successfully!
        </div>
      )}
    </div>
  );
};

export default CalendarWithEvents;
