import useFetch from "../hooks/useFetch";

export default function Featured() {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=Berlin,Madrid,London"
  );

  if (loading) return <p className="text-center text-lg font-medium py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-medium py-8">Error: {error.message}</p>;

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlwC-yV_8ZyiUcKgQZEt044K_eUnMfTZ_wWA&s",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/34/00/95/community-of-madrid.jpg?w=1200&h=700&s=1",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg"
  ];

  const cities = ["Berlin", "Madrid", "London"];

  return (
    <section className="py-5 lg:mx-28 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            images.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="w-full h-60 object-cover"
                  src={img}
                  alt={cities[i]}
                  loading="lazy"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{cities[i]}</h3>
                  <p className="text-gray-600 mb-4">
                    {data[i]} {data[i] === 1 ? "Hotel" : "Hotels"} Available
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="text-yellow-500 text-xl">&#9733;</span>
                    <p className="text-xl font-bold ml-1">N/A</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}