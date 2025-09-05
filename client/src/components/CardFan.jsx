import { motion } from "motion/react";

function CardFan() {
  return (
    <div className="bg-[#1E3A8A] -mt-[100px] flex items-center justify-center h-[500px]  pt-60 overflow-hidden">
      <div className="relative   rounded-3xl flex flex-wrap gap-10 items-center justify-center p-10">
        {/* Card */}
        <motion.div
          whileInView={{ rotate: 15, x: -250, y: 110 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute w-[440px] h-[260px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 flex flex-col justify-between text-white"
        >
          {/* Card Title */}
          <div className="text-[28px] font-semibold">Untitled</div>

          {/* Card Details */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[21px] font-medium">PHOEBE</div>
              <div className="mt-2 text-lg pr-10">06/24</div>
            </div>
            <div className="mt-4 text-[20px] tracking-[0.25em] font-mono">
              1234 1234 1234 1234
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileInView={{ rotate: 50, x: -150, y: -30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute w-[440px] h-[260px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 flex flex-col justify-between text-white"
        >
          {/* Card Title */}
          <div className="text-[28px] font-semibold">Untitled</div>

          {/* Card Details */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[21px] font-medium">PHOEBE</div>
              <div className="mt-2 text-lg pr-10">06/24</div>
            </div>
            <div className="mt-4 text-[20px] tracking-[0.25em] font-mono">
              1234 1234 1234 1234
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileInView={{ rotate: 90, x: -15, y: -80 }}
          transition={{ duration: 1, speed: "ease-in-out" }}
          viewport={{ once: true }}
          className="absolute w-[440px] h-[260px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 flex flex-col justify-between text-white"
        >
          {/* Card Title */}
          <div className="text-[28px] font-semibold">Untitled</div>

          {/* Card Details */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[21px] font-medium">PHOEBE</div>
              <div className="mt-2 text-lg pr-10">06/24</div>
            </div>
            <div className="mt-4 text-[20px] tracking-[0.25em] font-mono">
              1234 1234 1234 1234
            </div>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileInView={{ rotate: 120, x: 170, y: -30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute w-[440px] h-[260px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 flex flex-col justify-between text-white"
        >
          {/* Card Title */}
          <div className="text-[28px] font-semibold">Untitled</div>

          {/* Card Details */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[21px] font-medium">PHOEBE</div>
              <div className="mt-2 text-lg pr-10">06/24</div>
            </div>
            <div className="mt-4 text-[20px] tracking-[0.25em] font-mono">
              1234 1234 1234 1234
            </div>
          </div>
        </motion.div>
        {/* Card 5 */}
        <motion.div
          whileInView={{ rotate: 145, x: 280, y: 150 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute w-[440px] h-[260px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 flex flex-col justify-between text-white"
        >
          {/* Card Title */}
          <div className="text-[28px] font-semibold">Untitled</div>

          {/* Card Details */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[21px] font-medium">PHOEBE</div>
              <div className="mt-2 text-lg pr-10">06/24</div>
            </div>
            <div className="mt-4 text-[20px] tracking-[0.25em] font-mono">
              1234 1234 1234 1234
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CardFan;
