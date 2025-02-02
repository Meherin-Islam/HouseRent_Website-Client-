import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageMembers = () => {
    const [members, setMembers] = useState([]);

    // Fetch members from the server
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("http://localhost:5000/users"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch members");
                }
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        fetchMembers();
    }, []);

    // Handle member removal
    const handleRemove = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/users/${id}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error("Failed to remove member");
                    }

                    // Update the UI after removal
                    setMembers(members.filter((member) => member._id !== id));

                    Swal.fire("Deleted!", "The member has been removed.", "success");
                } catch (error) {
                    console.error("Error removing member:", error);
                    Swal.fire("Error!", "Failed to remove the member.", "error");
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">User Name</th>
                            <th className="border border-gray-300 px-4 py-2">User Email</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{member.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="btn bg-red-600  text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleRemove(member._id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center border border-gray-300 px-4 py-2"
                                >
                                    No members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMembers;
