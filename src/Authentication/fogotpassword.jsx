import { InputOTPControlled } from "../Molecules/InputOtp";
import {Button} from "@/components/ui/Button";
import { useContext,  useState } from "react";
import { sendOTPRequest, verifyOTPRequest } from "../Services/otpservice";
import {useToast} from '../hooks/use-toast';
import ForgotPasswordContext from "../Context/fogotPasswordcontext";
import { ResetPasswordDialog } from "../Organsims/ResetPasswordDialog";
function ForgotPassword(){
    const {email, setEmail, openResetPasswordDialog, setResetPasswordDialog, setFreezeEmail } = useContext(ForgotPasswordContext);
    const [isDisabled, setDisabled] = useState(false);
    const [timeleft, setTimeleft] = useState(0);
    const {toast} = useToast();
    const [OTP, setOTP] = useState('');
    async function handleOPTRequest(){
        try{
            setDisabled(true);
            setTimeleft(120);
            setTimer();
            const response = await sendOTPRequest(email);
            if(!response.sent){
                setDisabled(false);
                setTimeleft(0);
            }
            toast({
                title : "OTP",
                description : response.message
            })
        }catch(error){
            console.log(error);
        }
    }
    async function verifyOTP(){
        try{
            const temp = structuredClone(email);
            setFreezeEmail(temp);
            const response = await verifyOTPRequest(email, OTP);
            toast({
                title : "OTP",
                description : response.message
            })
            if(response.valid){
                console.log("set reset password dialog true");
                setResetPasswordDialog(true);
                const token = response.token;
                sessionStorage.setItem("resetPassword", token);
            }
        }catch(error){
            console.log(error);
        }
    }
    function setTimer(){
        let local = true;
        setTimeout(()=>{
            setTimeleft((prev)=>{
                if(prev <= 1){
                    setDisabled(false);
                    local = false;
                    return 0;
                }else{
                    local = true;
                    return prev - 1;
                }
            });
            console.log(local);
            if(local){
                setTimer();
            }
        },1000);
    return;
    }
    return(
        <div className="w-full h-screen flex flex-col content-center flex-wrap">
            <div className="w-fit h-fit mt-10">
                <h1 className="font-mono text-2xl">Reset Password</h1>
            </div>
            <div className="mt-10">
                <h1>Enter the registerd email Id</h1>
            </div>
            <div className="w-5/12 mt-1">
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
            </div>
            <div className="w-fit h-fit mt-2">
            {isDisabled ? <h1>{`Retry in ${timeleft} seconds`}</h1> : <Button onClick={()=>{handleOPTRequest()}}>Send OTP</Button>}
            </div>
            <div className="w-fit h-fit mt-10">
                <InputOTPControlled value={OTP} setValue={setOTP}/>
            </div>
            <div className="w-fit h-fit mt-2">
                <Button onClick={()=>{verifyOTP()}}>Submit</Button>
            </div>
            <ResetPasswordDialog/>
        </div>
    )
}
export default ForgotPassword;