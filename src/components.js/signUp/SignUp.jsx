import { NavLink } from "react-router-dom"
import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import styles from "./signUp.module.css";

const SignUp = () =>{
    const [emails, setEmails] = useState('');
    const [passwords, setPasswords] = useState('');
    const [error, setError] = useState(null);

    const auth = getAuth();

    const handleSignUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth, emails, passwords);
            console.log('User signed up successfully');
        }catch(error){
            setError(error.message);
        }
    };


     return(
        <>
        <div className={styles.signUpTop}>
            <h1>Sign Up</h1>
            <input type="text" placeholder="set Email" onChange={(e) => setEmails(e.target.value)} />
            <input type="password" placeholder="set Password" onChange={(e) => setPasswords(e.target.value)} />
            <NavLink to="/signIn">
              <button onClick={handleSignUp}>Sign Up</button>
            </NavLink>
            {error && <p>{error}</p>}
        </div>
        </>
     )
}
export default SignUp;