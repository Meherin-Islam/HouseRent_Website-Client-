
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const ApartmentLocation = () => {
  return (
    <section className="bg-amber-200 py-10 px-10 rounded-lg max-w-6xl shadow-lg mx-auto my-20">
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-4xl font-extrabold text-amber-800 mb-6">
          Apartment Location
        </h2>
        <p className="text-lg font-semibold text-amber-800 mb-4 w-3/4 mx-auto">
          Discover the exact location of your dream apartment and explore the
          surrounding neighborhood. Conveniently located near major landmarks,
          public transport, and essential services.
        </p>
      </motion.div>

     
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="w-full h-96 rounded-lg overflow-hidden shadow-lg mt-8"
      >
        <MapContainer
          center={[40.7128, -74.006]} 
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={[40.7128, -74.006]}>
            <Popup>
              Skyline Tower, New York City. <br /> Welcome to your new home!
            </Popup>
          </Marker>
        </MapContainer>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="mt-8 text-amber-800 text-lg leading-relaxed w-3/4 mx-auto"
      >
        <h3 className="text-2xl font-bold text-amber-900 mb-4">
          How to Get Here:
        </h3>
        <ul className="list-disc font-semibold list-inside space-y-2">
          <li>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              By Train: Take the A, C, or E subway line and get off at 34th
              Street.
            </motion.span>
          </li>
          <li>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              By Car: Enter "Skyline Tower, New York" into your GPS for
              turn-by-turn directions.
            </motion.span>
          </li>
          <li>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              By Bus: Use the M34 crosstown bus and get off at 9th Avenue.
            </motion.span>
          </li>
        </ul>
      </motion.div>
    </section>
  );
};

export default ApartmentLocation;
