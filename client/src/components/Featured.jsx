import { motion } from "motion/react";

import useFetch from "../hooks/useFetch";
import SectionHeader from "./SectionHeader";
import { useEffect, useRef, useState } from "react";

export default function Featured() {

  const constrainRef = useRef(null);

  const { data, isLoading, error, isError } = useFetch(
    "featured",
    "/hotels/featured"
  );
  
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  
  useEffect(()=>{
    if(carouselRef.current){
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  },[data])

  const getFakeRating = () => (Math.random() * 2 + 3).toFixed(1);

  const renderStars = (
    <svg
      className="size-5 text-[#f27d00]"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.963c.3.92-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.963a1 1 0 00-.363-1.118L2.037 9.39c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.963z" />
    </svg>
  );

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
      <div className="bg-red-50 border-l-4 border-red-600 p-4 my-8 mx-auto max-w-md rounded-sm shadow-sm">
        <p className="text-red-700 font-semibold text-sm">
          Error: {error.message}
        </p>
      </div>
    );
  }

  console.log(data);
  return (
    <section className="bg-gray-50 pt-16">
      <div className="container overflow-hidden">
        <SectionHeader
          title="Our services in Different Cities"
          description="Most popular choices for travellers from Bangladesh"
          button="Explore More"
        />
        {/* image slider */}
          
       <motion.div  ref={carouselRef} className="overflow-hidden">
        <motion.div
          whileInView={{x:-50}}
          transition={{duration:1}}
          drag="x"
          dragConstraints={{left:-width,right:0}}
          className="flex  gap-3 cursor-grab active:cursor-grabbing"
        >
          {data?.map((item, index) => {
            const rating = getFakeRating();

            return (
              <div key={index} className="shrink-0">
                <img
                  src={item.image}
                  alt="hotel image"
                  className="object-cover h-40 w-40 md:h-60 md:w-60 rounded-[15px] pointer-events-none"
                />
                <div className="py-3">
                  <p className="font-medium text-[18px] md:text-[21px] text-blue-950">
                    {item.city}
                  </p>
                  <span className=" text-gray-600 font-medium inline-flex gap-2">
                    {renderStars}
                    {rating}
                    <p>(Starts from :${item.minPrice})</p>
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
