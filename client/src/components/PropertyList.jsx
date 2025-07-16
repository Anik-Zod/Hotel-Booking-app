import useFetch from "../hooks/useFetch"

export default function PropertyList() {
  const { data, loading, error } = useFetch("/api/hotels/countByType")

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-blue-600 font-medium">Loading property types...</div>
      </div>
    )

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8 mx-auto max-w-2xl">
        <p className="text-red-700 font-medium">Error: {error.message}</p>
      </div>
    )

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://livingsn.com/wp-content/uploads/2022/10/309001509_107004208843733_595515860799337454_n.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXc6eOdzPasQvk4J-jp3XnWW6jEAFg8dve-w&s",
    "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1686090448422-de8536066f64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D",
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
          <span className="inline-block border-b-4 border-blue-500 pb-2">Browse by Property Type</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data &&
            images.map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                    src={img || "/placeholder.svg"}
                    alt={data[i]?.type}
                  />
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-blue-700">
                    {data[i]?.count}+ listings
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">{data[i]?.type}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-semibold text-blue-600">$99</span>/night
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm">&#9733;</span>
                      <p className="text-sm font-medium ml-1">N/A</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

