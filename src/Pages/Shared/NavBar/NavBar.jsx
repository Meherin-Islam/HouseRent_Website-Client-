
import { FaBuilding } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import pic from "../../../assets/logo.png";

const NavBar = () => {
    return (
        <div className="mt-12 w-5/6 mx-auto flex justify-between gap-32 items-center">
            <div className="flex nav space-x-14  text-2xl">
                <img className='w-12' src={pic}/>
                <h1 className='text-3xl'>Build Board</h1>
                <Link to="/" className="flex gap-1 items-center">
                <IoHome /> Home
                </Link>
               
                <Link to="/my-profile" className="flex gap-1 items-center">
                    <FaBuilding></FaBuilding> Apartment
                </Link>

               
                
            </div>
            <div className='flex nav space-x-12' >
            <Link to="/login" className="text-2xl btn bg-amber-800 text-white">
                     Login
                </Link>
                <Link to="/register"
                            className="text-2xl btn bg-green-700 text-white"
                        >
                            Register
                        </Link>
            </div>
            </div>
    );
};

export default NavBar;