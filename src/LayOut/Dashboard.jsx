import {  FaHome, FaUser,   } from "react-icons/fa";
import { FiUser, FiUsers, FiSpeaker, FiFileText, FiTag } from "react-icons/fi";
import { MdAnnouncement } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    
    const [isAdmin] = useAdmin();
    
    return (
        <div className="flex">
           
            <div className="w-64 min-h-screen bg-lime-300">
            <h2 className="text-3xl font-bold mb-6 text-center mt-4">Dashboard</h2>
                <ul className="menu p-4 text-xl font-bold">
                {
                        isAdmin ? <>

                         <li>
                         <NavLink to="/dashboard/profile">
                         <FiUser className="inline-block mr-2" />
                                    Admin Profile</NavLink>
                         </li>
                         <li>
                         <NavLink to="/dashboard/manage-members">
                <FiUsers className="inline-block mr-2" />
                Manage Members
              </NavLink>
                         </li>
                         <li>
                         <NavLink to="/dashboard/make-announcement">
                <FiSpeaker className="inline-block mr-2" />
                Make Announcement
              </NavLink>
                         </li>
                         <li>
                         <NavLink to="/dashboard/agreement-requests">
                <FiFileText className="inline-block mr-2" />
                Agreement Requests
              </NavLink>
                         </li>
                         <li>
                         <NavLink to="/dashboard/manage-coupons">
                <FiTag className="inline-block mr-2" />
                Manage Coupons
              </NavLink>
                         </li>

                         </>
                            :
                            <>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <FaUser></FaUser>
                                    My Profile</NavLink>
                            </li>
                                <li>
                                    <NavLink to="/dashboard/announcements">
                                       <MdAnnouncement></MdAnnouncement>
                                        Announcements</NavLink>
                                </li>
                                </>
                    }
                              
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>
            </div>
           
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;