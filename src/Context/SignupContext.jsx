import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../Services/userSignUp";
const  SignupContext = createContext(null);
export const SignupContextProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(loading){
            return;
        }
        if(password !== confirmPassword){
            setError("Password and confirm password do not match");
            return;
        }
        try{
            setError(false);
            setLoading(true);
            const user = await userSignUp(username, email, password);
            console.log(user);
            setLoading(false);
            navigate('/signin');
        }catch(error){
            console.log(error);
            setError(error.response.data.message);
            setLoading(false);
        }
    }
    return (
        <SignupContext.Provider value={{email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, username, setUsername, error, loading, handleSubmit}}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupContext;