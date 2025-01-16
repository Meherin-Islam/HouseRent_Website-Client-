import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.config'; // Import Firebase
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Listen for user authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Set user details when authenticated
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,  // Fetch name
                    photoURL: currentUser.photoURL,  // Fetch photo URL
                });
            } else {
                setUser(null); // Clear user when logged out
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const signInUser = (email, password) => {
        return auth.signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        return auth.signOut();
    };

    const createUser = (email, password, displayName, photoURL) => {
        return auth.createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            return user.updateProfile({
                displayName: displayName,
                photoURL: photoURL,
            });
        });
    };

    return (
        <AuthContext.Provider value={{ user, signInUser, signOutUser, createUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
