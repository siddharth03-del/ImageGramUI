import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UpdateProfile } from "../Services/uploadProfilePicture";
import { useContext } from "react";
import { MyContext } from "../context";
export function UploadProfilePictureDialog({ImageUploader, setImageUploader}) {
  const {profileReRender, setProfileReRender} = useContext(MyContext);
  const {setImageLoading} = useContext(MyContext);
  const [Image, setImage] = useState(null);
  const handleOpen = () => setImageUploader(!ImageUploader);
  function handleUpload(){
    async function handleUploadHelper(){
      const formdata = new FormData();
      formdata.append("image", Image);
      setImage(null);
      setImageLoading(true);
      await UpdateProfile(formdata);
      setProfileReRender(!profileReRender);
    }
    handleUploadHelper();
  }
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={ImageUploader} handler={handleOpen}>
        <DialogHeader>Profile Picture Uploader</DialogHeader>
        <DialogBody>
          <h1>
            Uplod you Profile Picture here
          </h1>
          <div>
            <input type="file" onChange={(e)=>{ setImage(e.target.files[0])}}/>
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
          <Button variant="gradient" color="green" onClick={()=>{handleUpload(); handleOpen()}} >
            <span>Upload</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}