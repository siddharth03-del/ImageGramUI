import  { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MyContext } from "../context";
import { useContext } from "react";
import { UpdateProfile } from "../Services/uploadProfilePicture";
export function UpdateProfileDialog({previousBio, previousName}) {
  const {size, setSize, profileReRender, setProfileReRender} = useContext(MyContext);
  const [bio, setBio] = useState(previousBio);
  const [name, setName] = useState(previousName);
  const handleOpen = (value) => setSize(value);
  useEffect(()=>{
    setBio(previousBio);
  },[previousBio]);
  useEffect(()=>{
    setName(previousName);
  },[previousName]);
  function submitHandler(){
    async function UpdateProfileHelper(){
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("bio", bio);
        const response = await UpdateProfile(formdata);
        setProfileReRender(!profileReRender);
        console.log(response);
        setSize(null);
    }
    UpdateProfileHelper();
  }
  return (
    <>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "lg"}
        handler={handleOpen}
      >
        <DialogHeader>Update Profile.</DialogHeader>
        <DialogBody>
            <div>
                <div>
                    <label htmlFor="name">Enter your name</label>
                    <input type="text" value={name} className="input input-bordered w-full" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="bio">Enter your bio</label>
                    <input type="text" value={bio} className="input input-bordered w-full" onChange={(e)=>{setBio(e.target.value)}}/>
                </div>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => submitHandler()}
            type="submit"
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}