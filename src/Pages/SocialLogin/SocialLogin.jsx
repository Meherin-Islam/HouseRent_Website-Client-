import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../../provider/AuthContext';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext); // Corrected function name
    const navigate = useNavigate(); 

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                navigate('/'); 
            })
            .catch(error => {
                console.error("Error during Google sign-in:", error.message);
            });
    };

    return (
        <div className='m-4'>
            <button onClick={handleGoogleSignIn} className='btn w-full bg-teal-500'>
                Continue With Google
            </button>
        </div>
    );
};

export default SocialLogin;
