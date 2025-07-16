import useFetch from "../hooks/useFetch";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400 text-sm space-x-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={"full" + i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z"/></svg>
      ))}
      {halfStar && (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <defs><linearGradient id="halfGrad"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs>
          <path fill="url(#halfGrad)" d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z"/>
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={"empty" + i} className="w-4 h-4 stroke-current text-gray-300 fill-transparent" viewBox="0 0 20 20"><path strokeWidth="1" d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z"/></svg>
      ))}
    </div>
  );
}

export default function FeaturedProperties() {
  const { data, isLoading, error, isError } = useFetch(
    "expensive",
    "/hotels/expensive"
  );

  if (isLoading)
    return (
      <p className="text-center text-lg font-medium text-gray-700 py-12">
        Loading featured properties...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold py-12">
        Error: {error.message}
      </p>
    );

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
         Highly  Rated Hotels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 flex flex-col overflow-hidden"
              style={{ maxWidth: "280px" }}
            >
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={item.photos}
                  alt={item.name || "Featured property"}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ${item.cheapestPrice} / night
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-md font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>

                <div className="flex items-center text-gray-500 text-sm mt-1 space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a8 8 0 1111.314-11.314 8 8 0 01-11.314 11.314z"
                    />
                  </svg>
                  <span>{item.city}</span>
                </div>

                <StarRating rating={3.5 + (index % 2)} />

                <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">
                  {item.desc || "No description available."}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  Distance: {item.distance || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
