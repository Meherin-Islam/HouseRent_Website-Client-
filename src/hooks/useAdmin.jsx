import { useQuery } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
 

const useAdmin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user.email}`); 
      return response.data?.admin; 
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
