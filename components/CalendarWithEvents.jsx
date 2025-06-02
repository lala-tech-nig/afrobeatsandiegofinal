const sampleEvents = {
  '2025-06-01': [
    { title: 'Team Meeting', description: 'Zoom call at 10am' },
    { title: 'Dentist Appointment', description: '3pm, Allen Ave' }
  ],
  '2025-06-04': [
    { title: 'Tech Conference', description: 'Victoria Island' }
  ],
  '2025-06-10': [
    { title: 'Product Launch', description: 'Launch of new app' },
    { title: 'Lunch with investor', description: 'Eko Hotel, 1pm' },
    { title: 'Webinar', description: 'AI Trends - 7pm' }
  ]
};

export default function CalendarWithEvents() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const daysInMonth = 30;
  const month = 'June';
  const year = 2025;

  const handleDateClick = (day) => {
    const formatted = `${year}-06-${String(day).padStart(2, '0')}`;
    setSelectedDate(formatted);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{month} {year}</h2>
      <div className="grid grid-cols-7 gap-4 text-center">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className="cursor-pointer p-4 border rounded-lg hover:bg-blue-100 transition duration-200"
          >
            <span className="font-semibold">{day}</span>
            {sampleEvents[`${year}-06-${String(day).padStart(2, '0')}`] && (
              <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mt-1"></div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">
              Events on {selectedDate}
            </h3>
            {sampleEvents[selectedDate]?.length > 0 ? (
              <div className="space-y-4">
                {sampleEvents[selectedDate].map((event, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-blue-700">{event.title}</h4>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events on this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
