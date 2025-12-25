import {
  ArrowUpRight,
  Star,
  Home,
  Wifi,
  Dumbbell,
  Waves,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useNavigate } from "react-router-dom";

export default function PropertyList() {
  const data = [
    {
      type: "Hotels",
      count: 34,
      price: 120,
      rooms: 2,
      rating: 4.5,
      amenities: ["WiFi", "Pool", "Gym"],
      verified: true,
    },
    {
      type: "Apartments",
      count: 12,
      price: 90,
      rooms: 1,
      rating: 4.0,
      amenities: ["WiFi", "Parking"],
      verified: true,
    },
    {
      type: "Resorts",
      count: 8,
      price: 200,
      rooms: 3,
      rating: 4.8,
      amenities: ["Pool", "Spa", "Gym"],
      verified: true,
    },
    {
      type: "Villas",
      count: 5,
      price: 350,
      rooms: 4,
      rating: 4.9,
      amenities: ["Pool", "WiFi", "Kitchen"],
      verified: true,
    },
    {
      type: "Cabins",
      count: 3,
      price: 150,
      rooms: 2,
      rating: 4.6,
      amenities: ["WiFi", "Fireplace"],
      verified: false,
    },
  ];

const images = [
  "https://res.cloudinary.com/dj6y31jyx/image/upload/w_700,h_500,c_fill,q_auto,f_auto,dpr_auto/v1766667549/hotel5_zx8pcx.jpg",
  "https://res.cloudinary.com/dj6y31jyx/image/upload/w_700,h_500,c_fill,q_auto,f_auto,dpr_auto/v1766667547/hotel3_frdhhg.jpg",
  "https://res.cloudinary.com/dj6y31jyx/image/upload/w_700,h_500,c_fill,q_auto,f_auto,dpr_auto/v1766667547/hotel3_dt8yz2.jpg",
  "https://res.cloudinary.com/dj6y31jyx/image/upload/w_700,h_500,c_fill,q_auto,f_auto,dpr_auto/v1766667547/hotel_dyyzkg.jpg",
  "https://res.cloudinary.com/dj6y31jyx/image/upload/w_700,h_500,c_fill,q_auto,f_auto,dpr_auto/v1766667547/hotel2_akxezp.jpg"
];



  const amenityIcon = (name) => {
    if (name === "WiFi") return <Wifi size={14} />;
    if (name === "Gym") return <Dumbbell size={14} />;
    if (name === "Pool") return <Waves size={14} />;
    if (name === "Fireplace") return <Flame size={14} />;
    return null;
  };

  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gradient-to-b container to-white ">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}

        <SectionHeader title="Explore our" highlight="top properties" description="Find the perfect stay from 3 October – 5 October" />
        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4">
          {data.map((item, i) => (
            <motion.article
              key={i}
              className="group relative h-[300px] sm:h-[340px] lg:h-[370px] rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={images[i]}
                alt={item.type}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                  {item.count}+ stays
                </span>

                <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 w-full px-4 pb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {item.type}
                </h3>

                {/* Rating & Price */}
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white text-sm">
                  <div className="flex items-center gap-1 bg-white/40 px-3 py-1 rounded-full w-max">
                    <Star
                      size={14}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                    <span>{item.rating}</span>
                  </div>

                  <span className="bg-white/30 px-2.5 py-1 rounded-full w-max">
                    From <span className="font-bold">${item.price}</span>
                  </span>
                </div>

                {/* Divider */}
                <div className="sm:my-3 my-1 h-px bg-white/30" />

                {/* Rooms */}
                <div className="flex items-center gap-1 text-white text-sm">
                  <Home size={14} />
                  <span>{item.rooms} rooms</span>
                </div>

                {/* Amenities */}
                <div className="hidden sm:flex flex-wrap gap-2 mt-3">
                  {item.amenities.slice(0, 3).map((a, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 rounded-full bg-white/30 px-2 py-0.5 text-xs text-white backdrop-blur hover:bg-yellow-500 transition"
                    >
                      {amenityIcon(a)}
                      {a}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                onClick={()=>navigate("/hotels")}
                className="mt-4 w-full rounded-xl bg-white/95 py-2.5 text-sm font-semibold text-slate-900 shadow hover:bg-white transition active:scale-[0.98]">
                  View details
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
