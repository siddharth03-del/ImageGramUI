import { LucideLoader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import LoginContext from '../Context/LoginContext';
export const ProtectedRoute = ({ children }) => {
    const {loading} = useContext(LoginContext);
    const loggedIn = localStorage.getItem('loggedIn');
    console.log(loggedIn);
    if(loading) {
        return <div><LucideLoader2 className="animate-spin ml-2" />Loading...</div>;
    }

    if(!loggedIn) {
        return <Navigate to="/signin" />;
    }

    return children;
};