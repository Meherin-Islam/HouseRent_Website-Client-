import {  FaHome, FaUser,   } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    
    const [isAdmin] = useAdmin();
    
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-lime-300">
            <h2 className="text-3xl font-bold mb-6 text-center mt-4">Dashboard</h2>
                <ul className="menu p-4 text-xl font-bold">
                            <li>
                                <NavLink to="/dashboard/profile">
                                    <FaUser></FaUser>
                                    My Profile</NavLink>
                            </li>
                                <li>
                                    <NavLink to="/dashboard/announcements">
                                       <MdAnnouncement></MdAnnouncement>
                                        Announcements</NavLink>
                                </li>
                              
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                   
                   
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;