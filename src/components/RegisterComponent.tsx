import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../features/firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router";



const RegisterComponent = () => {
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

    return (
        <>
            <section>
                <h2>Registrera nytt konto</h2>
                <label>Epost:</label>
                <input type="text" placeholder="Firstname" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Lösenord:</label>
                <input type="password" placeholder="Lastname" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={createUser}>SignUp</button>
            </section>
        </>
    )
}

export default RegisterComponent;