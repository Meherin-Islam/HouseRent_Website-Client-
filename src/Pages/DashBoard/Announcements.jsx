import { useEffect, useState } from "react";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch("http://localhost:5000/announcements");
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold mb-6">All Announcements</h1>
            {loading ? (
                <div className="text-center">
                    <p>Loading announcements...</p>
                </div>
            ) : announcements.length > 0 ? (
                <div className="overflow-x-auto w-full max-w-5xl">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement, index) => (
                                <tr key={announcement._id}>
                                    <td>{index + 1}</td>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={async () => {
                                                const confirm = window.confirm(
                                                    "Are you sure you want to delete this announcement?"
                                                );
                                                if (confirm) {
                                                    try {
                                                        const response = await fetch(
                                                            `http://localhost:5000/announcements/${announcement._id}`,
                                                            { method: "DELETE" }
                                                        );
                                                        if (response.ok) {
                                                            setAnnouncements((prev) =>
                                                                prev.filter(
                                                                    (item) => item._id !== announcement._id
                                                                )
                                                            );
                                                            alert("Announcement deleted successfully!");
                                                        } else {
                                                            alert("Failed to delete announcement.");
                                                        }
                                                    } catch (error) {
                                                        console.error(
                                                            "Error deleting announcement:",
                                                            error
                                                        );
                                                        alert("An error occurred while deleting.");
                                                    }
                                                }
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center">
                    <p>No announcements found.</p>
                </div>
            )}
        </div>
    );
};

export default Announcements;
