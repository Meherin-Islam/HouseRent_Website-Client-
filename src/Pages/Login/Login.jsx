import { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                Swal.fire({
                    title: "Success!",
                    text: "Logged in successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Login failed. Please check your credentials.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
                console.error("Sign In Error:", error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-2/5 mx-auto">
                <form onSubmit={handleSignIn} className="card-body">
                    <h1 className="text-5xl font-bold text-center mb-3">Sign In</h1>

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
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-amber-700">Sign In</button>
                    </div>
                </form>
                <div className="divider">OR</div>
                <SocialLogin />

                {/* Add Registration Link */}
                <p className="text-center mt-4">
                    New here?{" "}
                    <Link to="/register" className="text-teal-500 font-bold underline">
                        Click to register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
