import React from "react";
import { motion } from "framer-motion";

const AboutBuilding = () => {
  return (
    <section className="bg-orange-100 py-10 px-10 rounded-lg max-w-6xl shadow-lg mx-auto my-20">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        <h1 className="text-5xl font-extrabold text-center text-orange-900 mb-6">
          About the Building
        </h1>
        <div className="text-orange-800 leading-relaxed">
          <p className="text-lg mb-4 w-3/4 mx-auto font-semibold">
            Welcome to{" "}
            <span className="font-extrabold text-xl text-pink-700">
              The Skyline Tower
            </span>
            , a modern architectural marvel located in the heart of the city.
            This 50-story structure combines cutting-edge design with
            sustainable living, offering breathtaking views and top-tier
            amenities.
          </p>
          <p className="text-lg mb-4 w-3/4 mx-auto font-semibold">
            Residents enjoy access to luxury apartments, coworking spaces, and a
            rooftop garden spanning over 5,000 square feet. The Skyline Tower is
            an ideal destination for urban professionals and families.
          </p>

    
          <motion.p
            className="text-3xl w-3/5 mx-auto font-bold text-orange-800 mt-6"
            animate={{
              y: [0, -10, 0], 
            }}
            transition={{
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
            }}
          >
            Key Features:
          </motion.p>

         
          <motion.ul
            className="list-disc list-inside mt-4 space-y-2 w-3/5 mx-auto font-semibold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3, 
                },
              },
              hidden: { opacity: 0 },
            }}
          >
            {[
              "LEED-certified sustainable construction",
              "High-speed elevators",
              "24/7 security and concierge services",
              "Close proximity to public transport",
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="text-orange-800"
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -20 },
                }}
                transition={{ duration: 0.6 }}
              >
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBuilding;
