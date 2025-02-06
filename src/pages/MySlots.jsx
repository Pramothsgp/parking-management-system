import { useState } from 'react';

function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
  return newDate.toISOString();
}

const MOCK_BOOKINGS = [
  {
    id: 1,
    slotId: 5,
    startTime: new Date().toISOString(),
    endTime: addHours(new Date(), 2), // 2 hours later
    totalAmount: 10,
  },
  {
    id: 2,
    slotId: 8,
    startTime: new Date().toISOString(),
    endTime: addHours(new Date(), 3), // 3 hours later
    totalAmount: 15,
  },
];

function MySlots() {
  const [bookings] = useState(MOCK_BOOKINGS);

  const handleExtend = (bookingId) => {
    console.log('Extend booking:', bookingId);
    // Add logic to extend the booking (e.g., API call)
  };

  const handleCancel = (bookingId) => {
    console.log('Cancel booking:', bookingId);
    // Add logic to cancel the booking (e.g., API call)
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    return durationHours;
  };

  return (
    <div className="container mx-auto p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        My Parking Slots
      </h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const duration = calculateDuration(booking.startTime, booking.endTime);

            return (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Slot {booking.slotId}
                      </h3>
                      <div className="text-gray-600 dark:text-gray-300 space-y-2">
                        <p>
                          <span className="font-medium">Start Time:</span>{' '}
                          {new Date(booking.startTime).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">End Time:</span>{' '}
                          {new Date(booking.endTime).toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Duration:</span> {duration.toFixed(2)} hours
                        </p>
                        <p className="font-semibold">
                          <span className="font-medium">Total Amount:</span> ${booking.totalAmount}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleExtend(booking.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                      >
                        Extend
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400">
          You don't have any active bookings.
        </div>
      )}
    </div>
  );
}

export default MySlots;
