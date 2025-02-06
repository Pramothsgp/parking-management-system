import { useState, useEffect } from 'react';

const PARKING_SLOTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  isAvailable: Math.random() > 0.3,
}));

function Home() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date by default
  const [startTime, setStartTime] = useState('09:00'); // Default start time
  const [endTime, setEndTime] = useState('10:00'); // Default end time
  const [duration, setDuration] = useState(1); // set default time

  useEffect(() => {
    const calculatedDuration = calculateDuration();
    setDuration(calculatedDuration);
  }, [startTime, endTime, selectedDate]);

  const handleSlotSelect = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const calculateDuration = () => {
    const startDate = new Date(`${selectedDate}T${startTime}`);
    const endDate = new Date(`${selectedDate}T${endTime}`);

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    return durationHours;
  };

  const handleBooking = () => {
    if (selectedSlot) {
      const calculatedDuration = calculateDuration();
      console.log(
        'Booking slot:',
        selectedSlot.id,
        'for date:',
        selectedDate,
        'starting at',
        startTime,
        'ending at',
        endTime,
        'for',
        calculatedDuration,
        'hours'
      );
      // Here you would typically make an API call to book the slot
    }
  };

  return (
    <div className="container mx-auto p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Available Parking Slots</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PARKING_SLOTS.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotSelect(slot)}
            className={`
              p-4 rounded-lg text-center transition-colors duration-200
              ${slot.isAvailable
                ? selectedSlot?.id === slot.id
                  ? 'bg-blue-500 text-white shadow-md' // Selected state
                  : 'bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 text-gray-700 dark:text-gray-300 shadow-sm' // Available state
                : 'bg-red-100 dark:bg-red-800 cursor-not-allowed text-gray-500 dark:text-gray-400' // Occupied state
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            `}
            disabled={!slot.isAvailable}
          >
            Slot {slot.id}
            <div className="text-sm mt-1">
              {slot.isAvailable ? 'Available' : 'Occupied'}
            </div>
          </button>
        ))}
      </div>

      {selectedSlot && (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Book Slot {selectedSlot.id}
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="selectedDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Time:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Time:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Time: {duration.toFixed(2)} hours
            </div>

            <div className="text-lg font-semibold text-gray-800 dark:text-white">
              Total: ₹{Math.floor(duration * 5,2)}
            </div>
            <button
              onClick={handleBooking}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
