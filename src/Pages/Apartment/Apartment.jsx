import { useEffect, useState } from "react";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the server
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("http://localhost:5000/apartments");
        const data = await response.json();
        setApartments(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) {
    return <div className="text-center text-lg py-6">Loading apartments...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Available Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <div
            key={apartment.apartmentNo}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.apartmentNo}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Apartment No: {apartment.apartmentNo}</h3>
              <p className="text-gray-600">Floor No: {apartment.floorNo}</p>
              <p className="text-gray-600">Block Name: {apartment.blockName}</p>
              <p className="text-green-600 font-medium">Rent: ${apartment.rent}</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                View Agreement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
