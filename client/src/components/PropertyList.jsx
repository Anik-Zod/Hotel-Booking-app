import { Section } from "lucide-react";
import useFetch from "../hooks/useFetch";
import SectionHeader from "./SectionHeader";

export default function PropertyList() {
  const { data, loading, error } = useFetch("/api/hotels/countByType");

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-blue-600 font-medium">
          Loading property types...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8 mx-auto max-w-2xl">
        <p className="text-red-700 font-medium">Error: {error.message}</p>
      </div>
    );

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://livingsn.com/wp-content/uploads/2022/10/309001509_107004208843733_595515860799337454_n.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXc6eOdzPasQvk4J-jp3XnWW6jEAFg8dve-w&s",
    "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/689052811.jpg?k=f4e2d176f38a9421490197dd1796127fdbf15ffbfe18d283d131a056d4cfbdd5&o=",
  ];

  return (
    <section className="pt-8 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:container">
        <SectionHeader title="Stay at our top unique properties" description="Save on stays for 3 October - 5 October" button="Get Started" /> 

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-4 grid-flow-row-dense">
          {data &&
            images.map((img, i) => (
              <div
                key={i}
                className={` rounded-2xl border hover:shadow-2xl transition-all duration-300 overflow-hidden group 
          ${i == 1 || i == 2 ? "col-span-2" : ""} 
          ${i == images.length - 1 ? "col-span-3" : ""}`}
              >
                {/* Image section */}
                <div className="relative">
                  <img
                    className=" w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                    src={img || "/placeholder.svg"}
                    alt={data[i]?.type}
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Badge */}
                  <div className=" absolute top-3 right-3 bg-white backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-semibold text-[#003B95] shadow-sm">
                    {data[i]?.count}+ listings
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900 capitalize group-hover:text-[#003B95] transition-colors">
                    {data[i]?.type}
                  </h2>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      Starting from{" "}
                      <span className="font-semibold text-[#003B95]">$99</span>
                      /night
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-700 text-sm animate-ping">&#9733;</span>
                      <p className="text-sm font-medium ml-1">N/A</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
