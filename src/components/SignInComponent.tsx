import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../features/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";


const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const signInUser = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Inloggad', userCredential);
                navigate('/addtodo');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }



    return (
        <>
            <section>
                <h2>Logga in</h2>
                <label>Epost:</label>
                <input type="text" placeholder="Firstname" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Lösenord:</label>
                <input type="password" placeholder="Lastname" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={signInUser}>SignIn </button>
                <br />
                <Link to='/register'>Registrera nytt konto</Link>

                <br />
            </section>
        </>
    )
}

export default SignInComponent;