import { motion } from "motion/react";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import avatar5 from "../assets/avatar-5.png";
import avatar6 from "../assets/avatar-6.png";
import avatar7 from "../assets/avatar-7.png";
import avatar8 from "../assets/avatar-8.png";
import avatar9 from "../assets/avatar-9.png";
import SectionHeader from "./SectionHeader";
import { twMerge } from "tailwind-merge";

const testimonials = [
  { text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.", imageSrc: avatar1, name: "Jamie Rivera", username: "@jamietechguru00" },
  { text: "Our team's productivity has skyrocketed since we started using this tool.", imageSrc: avatar2, name: "Josh Smith", username: "@jjsmith" },
  { text: "This app has completely transformed how I manage my projects and deadlines.", imageSrc: avatar3, name: "Morgan Lee", username: "@morganleewhiz" },
  { text: "I was amazed at how quickly we were able to integrate this app into our workflow.", imageSrc: avatar4, name: "Casey Jordan", username: "@caseyj" },
  { text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.", imageSrc: avatar5, name: "Taylor Kim", username: "@taylorkimm" },
  { text: "The customizability and integration capabilities of this app are top-notch.", imageSrc: avatar6, name: "Riley Smith", username: "@rileysmith1" },
  { text: "Adopting this app for our team has streamlined our project management and improved communication across the board.", imageSrc: avatar7, name: "Jordan Patels", username: "@jpatelsdesign" },
  { text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.", imageSrc: avatar8, name: "Sam Dawson", username: "@dawsontechtips" },
  { text: "Its user-friendly interface and robust features support our diverse needs.", imageSrc: avatar9, name: "Casey Harper", username: "@casey09" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonial() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
      <SectionHeader title="What People Say about us" description="From intuitive design to powerful features, our app has become an essential tool for users around the world." button="Get Started" m/>
        <div className="flex justify-center gap-8 mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
          <TestimonialCard lists={firstColumn} duration={14} />
          <TestimonialCard lists={secondColumn} duration={10} className="hidden lg:block"/>
          <TestimonialCard lists={thirdColumn} duration={14} className="hidden sm:block" />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ lists, duration,className }) {
  return (
    <div className={twMerge("overflow-hidden h-120 w-80", className)}>
      <motion.div
        animate={{ y: "-50%" }}
        transition={{ duration: duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        className="space-y-6"
      >
        {lists.concat(lists).map(({ text, imageSrc, name, username }, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 max-w-xs w-full"
          >
            <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
            <div className="flex items-center gap-4 mt-6">
              <img src={imageSrc} alt={name} className="h-12 w-12 rounded-full object-cover" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg text-gray-900">{name}</span>
                <span className="text-sm text-gray-500">{username}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
