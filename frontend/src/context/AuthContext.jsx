import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup ,signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

//authProvider
export const AuthProvider = ({children}) => {

    const navigate = useNavigate();


    const [currentUser, setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

    //register a user
    const registerUser = async(email , password) => {
        return await createUserWithEmailAndPassword(auth , email , password)
    }

    //login user
    const loginUser = async(email , password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    //sign up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }


    //logout user
    const logoutUser = () => {
        return signOut(auth).then(() => {
            localStorage.removeItem("cartItems"); // Clear cart on logout
            navigate("/"); // Redirect 
            window.location.reload(); // Full page refresh
            
        });
    };

    //manage user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)

            if(user){
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })

        return () => unsubscribe();
    },[])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
