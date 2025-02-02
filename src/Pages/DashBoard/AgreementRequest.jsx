import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 

const AgreementRequest = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const fetchAgreements = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/agreements");
      if (Array.isArray(response.data)) {
        setAgreements(response.data);
      } else {
        throw new Error("API response is not an array");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch agreement requests");
    } finally {
      setLoading(false);
    }
  };

  

  const handleAction = async (id, action) => {
    try {
      const response = await axios.patch(`http://localhost:5000/agreements/${id}`, { action });
  
     
      if (response.data?.success) {
       
        setAgreements((prev) => prev.filter((agreement) => agreement._id !== id));
  
       
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Agreement ${action}ed successfully!`,
        });
      } else {
        
        throw new Error(response.data?.error || 'Unexpected response format');
      }
    } catch (err) {
      console.error(err.message);
  
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.error || 'Something went wrong. Please try again.',
      });
    }
  };
  


  
  useEffect(() => {
    fetchAgreements();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agreement Requests</h1>
      {loading ? (
        <p className="text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Floor No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Block Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Room No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rent</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Request Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.length > 0 ? (
                agreements.map((agreement) => (
                  <tr key={agreement._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{agreement.userName}</td>
                    <td className="border border-gray-300 px-4 py-2">{agreement.userEmail}</td>
                    <td className="border border-gray-300 px-4 py-2">{agreement.floorNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{agreement.blockName}</td>
                    <td className="border border-gray-300 px-4 py-2">{agreement.apartmentNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{agreement.rent}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(agreement.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleAction(agreement._id, "accept")}
                        className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                        disabled={agreement.status === "checked"}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(agreement._id, "reject")}
                        className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                        disabled={agreement.status === "checked"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border border-gray-300 px-4 py-2 text-center">
                    No agreements found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgreementRequest;
