import React from "react";
import { motion } from "framer-motion";

const coupons = [
  {
    id: 1,
    discount: "25% OFF",
    description: "On all electronics",
    code: "ELEC25",
    expiry: "Valid until 31st Jan 2025",
  },
  {
    id: 2,
    discount: "50% OFF",
    description: "On fashion products",
    code: "FASHION50",
    expiry: "Valid until 15th Feb 2025",
  },
  {
    id: 3,
    discount: "Buy 1 Get 1 Free",
    description: "On all pizzas",
    code: "PIZZADEAL",
    expiry: "Valid until 10th Feb 2025",
  },
];

const Coupons = () => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <section className="bg-gradient-to-r from-orange-200 to-red-300 py-10 px-6 rounded-lg max-w-7xl shadow-lg mx-auto my-20">
      <h2 className="text-4xl font-extrabold text-center text-white mb-10">
        Exclusive Coupons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: coupon.id * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-lime-800 mb-2">
              {coupon.discount}
            </h3>
            <p className="text-lime-700 mb-4">{coupon.description}</p>
            <p className="text-gray-500 text-sm mb-6">{coupon.expiry}</p>
            <div className="flex items-center justify-between">
              <span className="bg-lime-100 text-lime-800 px-4 py-2 rounded-full font-mono text-sm">
                {coupon.code}
              </span>
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              >
                Copy Code
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Coupons;
