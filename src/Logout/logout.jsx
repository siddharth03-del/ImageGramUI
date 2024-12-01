import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MyContext } from "../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { fetchCurrentUser, removeToken } from "../Helpers/storeToken";
export function LogoutDialog() {
  const {openLogout, setLogout} = useContext(MyContext);
  const handleOpen = () => setLogout(!openLogout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function logoutHanlder(){
    queryClient.invalidateQueries();
    queryClient.resetQueries();
    const currentUser = fetchCurrentUser();
    removeToken(currentUser);
    navigate("/");
    setLogout(!openLogout);
  }
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={openLogout} handler={handleOpen}>
        <DialogHeader>Logout</DialogHeader>
        <DialogBody>
          Are you sure you want to log out. <br /> After logout you need to signIn again.
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
          <Button variant="gradient" color="red" onClick={logoutHanlder}>
            <span>Logout</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default LogoutDialog;