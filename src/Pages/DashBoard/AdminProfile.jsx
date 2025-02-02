import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminProfile = () => {
    const [user, setUser] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName || "N/A",
                    email: currentUser.email || "N/A",
                    image: currentUser.photoURL || "https://via.placeholder.com/150",
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const { data: adminData, isLoading } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: async () => {
            if (!user) return null;
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data;
        },
        enabled: !!user,
    });

    if (!user) {
        return <p>Loading user information...</p>;
    }

    if (isLoading) {
        return <p>Loading admin details...</p>;
    }

    return (
        <div className="p-6 bg-pink-200 p-10 shadow-md rounded-lg">
            <div className="text-center">
                <p className="font-bold text-red-800 text-3xl mb-6">Welcome To Your Profile</p>
                <img
                    src={user.image}
                    alt="Admin"
                    className="w-24 h-24 mx-auto rounded-full"
                />
                <h2 className="text-2xl text-red-700 font-bold mt-4">{user.name}</h2>
                <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mt-6 space-y-2">

                <p className="text-xl"><strong>Total Users:</strong> {adminData?.totalUsers}</p>
                <p className="text-xl"><strong>Total Members:</strong> {adminData?.totalMembers}</p>
            </div>
        </div>
    );
};

export default AdminProfile;
