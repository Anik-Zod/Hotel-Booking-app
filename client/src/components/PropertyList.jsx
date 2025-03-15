import useFetch from "../hooks/useFetch";

export default function PropertyList() {
  const { data, loading, error } = useFetch("/api/hotels/countByType");

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://livingsn.com/wp-content/uploads/2022/10/309001509_107004208843733_595515860799337454_n.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXc6eOdzPasQvk4J-jp3XnWW6jEAFg8dve-w&s",
    "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1686090448422-de8536066f64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose What You Want</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data &&
          images.map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img className="w-full h-48 object-cover" src={img} alt={data[i]?.type} />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{data[i]?.type}</h2>
                <p className="text-gray-600 mb-4">
                  We have {data[i]?.count} {data[i]?.type}
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">&#9733;</span>
                  <p className="text-lg font-bold ml-1">N/A</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}