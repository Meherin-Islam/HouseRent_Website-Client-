import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthContext from "../../provider/AuthContext";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState(""); // State to hold the user's name
    const [photoUrl, setPhotoUrl] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const validatePassword = (password) => {
            const errors = [];
            if (password.length < 6) {
                errors.push("Password must be at least 6 characters long.");
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                errors.push("Password must contain at least one uppercase letter.");
            }
            if (!/(?=.*\d)/.test(password)) {
                errors.push("Password must contain at least one number.");
            }
            if (!/(?=.*[!@#$%^&*()_+=[\]{};:'\"\\|,.<>/?])/.test(password)) {
                errors.push("Password must contain at least one special character.");
            }
            return errors;
        };

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setErrors(passwordErrors);
        } else {
            setErrors([]);
            try {
                // Register the user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user; // Newly created user object

                // Update the user's profile with the display name and photo URL
                await updateProfile(user, {
                    displayName: userName,
                    photoURL: photoUrl,
                });

                const userData = {
                    email: user.email,
                    name: userName,

                };

                const response = await fetch('https://build-board-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();
                if (data.insertedId) {
                    console.log('user added to the database')
                }

                // Sign out the current user
                await signOut(auth);

                // Sign in the new user
                await signInWithEmailAndPassword(auth, email, password);

                Swal.fire({
                    title: "Registration Successful!",
                    text: "Welcome to Build Board!",
                    icon: "success",
                    confirmButtonText: "Continue",
                }).then(() => {
                    navigate('/'); // Navigate to home page
                });
            } catch (error) {
                console.error("Error during registration:", error.message);

                Swal.fire({
                    title: "Registration Failed!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });

                setErrors([error.message]);
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Build Board:Register</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <h1 className="text-5xl font-bold text-center mb-3">Register now!</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Your full name"
                                className="input input-bordered"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                placeholder="Profile photo URL"
                                className="input input-bordered"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div className="form-control text-red-600 mt-4">
                                {errors.map((error, index) => (
                                    <p key={index} className="text-sm">{error}</p>
                                ))}
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button className="btn bg-green-600">Register</button>
                        </div>
                    </form>
                    <div className="divider"> OR</div>
                    <SocialLogin />
                    <p className="text-center mt-4">
                        Already Have An Account?{" "}
                        <Link to="/login" className="text-green-600 underline font-bold">
                            Click to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
