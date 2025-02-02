import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "N/A",
          email: currentUser.email || "N/A",
          image: currentUser.photoURL || "https://via.placeholder.com/150", // Default image if none provided
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  if (!user) {
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Loading user information...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-2xl mx-auto">
     
      <div className="flex items-center mb-6">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full shadow-lg"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

     
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Agreement Info</h3>
        <div className="space-y-2 text-gray-800">
          <p>
            <span className="font-medium">Agreement Accept Date:</span> None
          </p>
          <h4 className="text-lg font-semibold mt-4">Rented Apartment Info</h4>
          <p>
            <span className="font-medium">Floor:</span> None
          </p>
          <p>
            <span className="font-medium">Block:</span> None
          </p>
          <p>
            <span className="font-medium">Room No:</span> None
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
