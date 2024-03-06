import React, {useState} from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useValue } from "../EcomContext";
import { NavLink } from "react-router-dom";
import styles from "./signIn/signIn.module.css"

const Auth =() =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {setLoggedIn, loggedIn} = useValue();

    const auth = getAuth();



  

    const handleSignIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setLoggedIn(true);
            localStorage.setItem('loggedIn', 'true');
            const user = auth.currentUser;
            if(user){
                localStorage.setItem("usersd",user.uid);
    
            }
            window.location.reload();
            console.log('User signed in successfully', loggedIn);
        }catch(error){
            setError(error.message);
        }
    };

    

    return(
        <div className={styles.signInTop}>
            <h1>Sign In</h1>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <NavLink to="/">
            <button onClick={handleSignIn}>Sign In</button>
            </NavLink>
            <NavLink to="/signUp"><h3>Or SignUp instead</h3></NavLink>
            {error && <p>{error}</p>}

        </div>
    )
}

export default Auth;