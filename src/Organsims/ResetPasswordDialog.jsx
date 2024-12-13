import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ForgotPasswordContext from "../Context/fogotPasswordcontext";
import { Input , Typography} from "@mui/material";
import { ChangePasswordRequest } from "../Services/changePassword";
import { useNavigate } from "react-router-dom";
export function ResetPasswordDialog() {
  const {openResetPasswordDialog, setResetPasswordDialog, freezeEmail, setFreezeEmail, setEmail} = useContext(ForgotPasswordContext);
  const handleOpen = () => setResetPasswordDialog(!openResetPasswordDialog);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  async function changePasswordHandler(){
    try{
        if(password == ''){
            alert("Password is required");
            return;
        }
        if(password !== confirmPassword){
            alert("Password and confirm password do not match");
            return;
        }
        const response = await ChangePasswordRequest(freezeEmail, password);
        setResetPasswordDialog(false);
        setEmail('');
        setFreezeEmail('');
        navigate('/signin');
        console.log(response);
    }catch(error){
        console.log(error);
    }
  }
  return (
    <>
      <Dialog open={openResetPasswordDialog} handler={handleOpen} size="md">
        <DialogHeader>Reset Password</DialogHeader>
        <DialogBody>
          <label>Password</label>  
          <div className="">
            <div className="">
                <Input type="password" label="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required={true}/>
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                    >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                    </svg>
                    Use at least 8 characters, one uppercase, one lowercase and one number.
                </Typography>
            </div>
            <label>Confirm Password</label>
            <div className="">
                <Input type="password" label="Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} required={true}/>
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                    >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                    </svg>
                    Use at least 8 characters, one uppercase, one lowercase and one number.
                </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={changePasswordHandler}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}