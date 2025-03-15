export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About Hotel Booking App</h2>
            <p className="text-base opacity-75">
              Our platform provides a seamless way to search, compare, and book hotel rooms effortlessly.
              Whether you're looking for budget stays or luxury suites, we have options tailored for every traveler.
            </p>
            <ul className="text-base opacity-75 space-y-3">
              <li>🔍 Advanced search filters – Find hotels by price, distance, town, and amenities.</li>
              <li>💳 Secure booking system – Real-time price calculations with instant confirmations.</li>
              <li>🔐 Protected routes – Built-in JWT authentication for enhanced security.</li>
              <li>📊 Admin dashboard – Manage bookings, analyze trends, and monitor business growth with charts & tables.</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-base opacity-75 hover:opacity-100 transition-opacity">
                  About Me
                </a>
              </li>
              <li>
                <a href="/contact" className="text-base opacity-75 hover:opacity-100 transition-opacity">
                  My Portfolio
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-base opacity-75 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-base opacity-75 hover:opacity-100 transition-opacity">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Me</h3>
            <ul className="space-y-3">
              <li className="text-base opacity-75">📧 Email: anikdas169@gmail.com</li>
              <li className="text-base opacity-75">📞 Phone: +880 1996259365</li>
              <li className="text-base opacity-75">📍 Address: Chattogram, Bangladesh</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-base opacity-75">
              Stay updated with the latest deals, discounts, and travel tips by subscribing to our newsletter.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-base opacity-75">
            Built with ❤️ by Anik | © {new Date().getFullYear()} Hotel Booking App. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
