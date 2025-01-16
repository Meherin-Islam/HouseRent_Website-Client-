import { useEffect, useState } from "react";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentRange, setRentRange] = useState({ min: "", max: "" });

  const itemsPerPage = 6;

  // Fetch data from the server
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("http://localhost:5000/apartments");
        const data = await response.json();
        setApartments(data);
        setFilteredApartments(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  
  const handleSearch = () => {
    const { min, max } = rentRange;
    const minRent = parseInt(min, 10);
    const maxRent = parseInt(max, 10);

    if (min && max) {
      const filtered = apartments.filter(
        (apartment) => apartment.rent >= minRent && apartment.rent <= maxRent
      );
      setFilteredApartments(filtered);
      setCurrentPage(1); 
    } else {
      setFilteredApartments(apartments);
    }
  };

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApartments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);

  if (loading) {
    return <div className="text-center text-lg py-6">Loading apartments...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Available Apartments</h1>

     
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Min Rent"
          className="border  rounded-lg px-4 py-2 w-36 "
          value={rentRange.min}
          onChange={(e) => setRentRange({ ...rentRange, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Rent"
          className="border rounded-lg px-4 py-2 w-36"
          value={rentRange.max}
          onChange={(e) => setRentRange({ ...rentRange, max: e.target.value })}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((apartment) => (
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
              <p className="text-green-600 font-bold">Rent: ${apartment.rent}</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                View Agreement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className={`py-2 px-4 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"} transition`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`py-2 px-4 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"} transition`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartment;
