import { FaBuilding } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import pic from "../../../assets/logo.png";
import AuthContext from "../../../provider/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="mt-12 w-5/6 mx-auto flex justify-between  items-center">
     
        <div className="flex items-center gap-2">
        <img className="w-12" src={pic} alt="Logo" />
        <h1 className="text-3xl font-bold">Build Board</h1>
        </div>

<div className="flex text-2xl gap-8 font-semibold">
<Link to="/" className="flex gap-1 items-center hover:text-green-800">
          <IoHome /> Home
        </Link>
        <Link
          to="/my-profile"
          className="flex gap-1 items-center hover:text-green-600"
        >
          <FaBuilding /> Apartment
        </Link>
</div>
       
     

     
      <div className="flex items-center space-x-6">
        {user ? (
          
          <div className="relative">
            <img
              src={user.photoURL } 
              alt="Profile"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg py-2 w-48 z-50">
                <p className="px-4 py-2 font-bold border-b">{user.displayName || "User"}</p>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          
          <>
            <Link
              to="/login"
              className="text-2xl btn bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
            >
              Login
            </Link>
            
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
