import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../features/firebaseConfig";
import { useNavigate } from "react-router-dom";


const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCrediential) => {
                console.log('Inloggad', userCrediential);
                navigate('/addtodo');

            })
            .catch((error) => {
                console.log(error.message);

            });
    }

    const signInUser = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredinteial) => {
                console.log('Inloggad', userCredinteial);
                navigate('/addtodo');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }



    return (
        <>
            <label>Epost:</label>
            <input type="text" placeholder="Firstname" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Lösenord:</label>
            <input type="password" placeholder="Lastname" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={signInUser}>SignIn </button>
            <button onClick={createUser}>SignUp</button>

            <br />
        </>
    )
}

export default SignInComponent;