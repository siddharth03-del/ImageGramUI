import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { deleteUserAccount } from "../Services/deleteUser";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, removeToken } from "../Helpers/storeToken";
export function DeleteAccountDialog({open ,setOpen}) {
  const navigate = useNavigate();
  async function handleDeleteAccount(){
    try{
        const response = await deleteUserAccount();
        console.log(response);
        const currentUser = fetchCurrentUser();
        removeToken(currentUser);
        navigate("/signin");
    }catch(error){
        console.log(error);
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogHeader>Delete Account</DialogHeader>
        <DialogBody>
          Are You sure you want to delete this account from ImageGram. <br/> Delete your account will delete all the posts, comments, likes made by you. 
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>{setOpen(false)}}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={()=>{handleDeleteAccount()}}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}