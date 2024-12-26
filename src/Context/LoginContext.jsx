import { createContext , useState } from "react";
import { userSingIn } from "../Services/userSignIn";
import { storeToken, setCurrentUser } from '../Helpers/storeToken';
import { useNavigate } from "react-router-dom";
const LoginContext = createContext(null);
export const LoginContextProvider = ({children})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("called");
        let token;
        try{
            setError(false);
            setLoading(true);
            token = await userSingIn(email, password);
            localStorage.setItem("loggedIn", true);
            setLoading(false);
            storeToken(email, token);
            setCurrentUser(email);
            setEmail('');
            setPassword('');
            navigate('/homepage/posts');
            return;
        }catch(error){
            setLoading(false);
            setError(true);
            console.log(error);
            return;
        }
    };
    return(
        <LoginContext.Provider value={{email, password, setEmail, setPassword, loading, error, handleSubmit}}>
            {children}
        </LoginContext.Provider>
    )
}
export default LoginContext;