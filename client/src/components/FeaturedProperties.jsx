import useFetch from "../hooks/useFetch";

export default function FeaturedProperties() {
  const { data, loading, error } = useFetch("api/hotels?min=140&featured=true&limit=5");

  if (loading) return <p className="text-center text-lg font-medium text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>;

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {data.map((item, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <img 
              src={item.photos[0]} 
              alt={item.name} 
              className="w-full h-56 object-cover" 
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.city}</p>
              <p className="text-green-600 font-medium mt-2">Starting from <span className="font-bold">${item.cheapestPrice}</span></p>
              {item.rating && (
                <div className="mt-3 flex items-center justify-center">
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-lg">{item.rating}</span>
                  <span className="ml-2 text-gray-700 text-sm">Excellent</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
