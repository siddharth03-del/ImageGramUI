import { createContext, useState } from "react";

const ForgotPasswordContext = createContext(null);
export const ForgotPasswordContextProvider = ({children})=>{
    const [openResetPasswordDialog, setResetPasswordDialog] = useState(false);
    const [email, setEmail] = useState('');
    const [freezeEmail, setFreezeEmail] = useState(' ');
    return (
        <ForgotPasswordContext.Provider value={{openResetPasswordDialog, setResetPasswordDialog, email, setEmail, freezeEmail, setFreezeEmail}}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}
export default ForgotPasswordContext;