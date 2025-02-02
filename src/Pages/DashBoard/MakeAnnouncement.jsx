import { useState } from "react";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const announcementData = {
            title,
            description,
        };

        try {
            const response = await fetch("https://build-board-server.vercel.app/announcements", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(announcementData),
            });

            const data = await response.json();

            if (data.announcementId) {
                Swal.fire({
                    title: "Success!",
                    text: "Announcement created successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                // Reset form fields
                setTitle("");
                setDescription("");
            } else {
                throw new Error("Failed to create announcement");
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-lg bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Make Announcement</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Enter announcement title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="Enter announcement description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <button type="submit" className="btn btn-primary">
                                Submit Announcement
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
