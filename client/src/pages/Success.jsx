import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaCalendarAlt } from 'react-icons/fa';

const Success = () => {
  useEffect(() => {
    // Clear any stored booking data
    localStorage.removeItem('selectedRooms');
    localStorage.removeItem('bookingDates');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your hotel reservation has been successfully confirmed. 
          You will receive a confirmation email shortly with all the details.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaHome />
            Back to Home
          </Link>
          
          <Link
            to="/bookings"
            className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <FaCalendarAlt />
            View My Bookings
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact our support team at support@hotel.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;