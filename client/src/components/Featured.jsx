import useFetch from "../hooks/useFetch";

export default function Featured() {
  const { data, isLoading, error, isError } = useFetch(
    "featured",
    "/hotels/featured"
  );

  const getFakeRating = () => (Math.random() * 2 + 3).toFixed(1);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i < fullStars ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.963c.3.92-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.963a1 1 0 00-.363-1.118L2.037 9.39c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.963z" />
        </svg>
      );
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="animate-pulse text-blue-600 font-medium text-base">
          Loading featured properties...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-600 p-4 my-8 mx-auto max-w-md rounded shadow">
        <p className="text-red-700 font-semibold text-sm">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 mt-9 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
          Our services in Different Cities
        </h2>
        {/* Responsive Grid: 2 columns on mobile, 2 on small, 3 on medium, 4 on large */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {data?.map((item, i) => {
            const rating = getFakeRating();
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              >
                {/* Smaller image height for mobile */}
                <div className="relative h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Property in ${item.city}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-blue-600 text-white text-xs sm:text-xs px-2 py-0.5 rounded-full shadow">
                    {item.city}
                  </span>
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-bold text-xs sm:text-sm mt-1">
                    ${item.minPrice}{" "}
                    <span className="font-normal text-gray-500">/ night</span>
                  </p>
                  <div className="flex items-center space-x-1 mt-1 sm:mt-2">
                    <span className="flex">{renderStars(rating)}</span>
                    <span className="text-xs text-gray-600 font-medium">{rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
