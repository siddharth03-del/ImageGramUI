import { useState } from "react";
import { createPost } from "../Services/createPost";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
export function Upload(){
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageUrl , setImageUrl] = useState(null);
    const navigate = useNavigate(null);
    const [isLoading, setisLoading] = useState(false);
    function handleImageUpdate(event){
        const file = event.target.files[0];
        setFile(file);
        setImageUrl(URL.createObjectURL(file));
    }
    const handleUpload  = async(e)=>{
        e.preventDefault();
        setisLoading(true);
        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append("caption" , caption);
        const res = await createPost(formdata);
        console.log(res);
        setisLoading(false);
        navigate("/homepage/profile");
    }
    return(
        <div className="w-full h-[calc(100vh-4rem)] relative z-0">
            <div className="ml-10 h-full z-0 absolute">
                <div className="w-[500px] h-[400px]">
                    <img src={imageUrl} alt = "upload your image"/>
                </div>
                <form action="sumit" onSubmit={handleUpload}>
                    <div>
                        <input type="file" name="image" onChange={(e)=>{ handleImageUpdate(e)}} required/>
                    </div>
                    <div>
                        <label htmlFor="caption">Enter the caption : </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>{setCaption(e.target.value)}} required/>
                    </div>
                    <div>
                        <button className="btn btn-info" type="submit">Upload</button>
                    </div>
                </form>
            </div>
            {isLoading ? <div className="z-20 w-full h-full relative">
                <div className="bg-white bg-opacity-50 flex justify-center items-center h-full">
                    <Spinner color="blue" className="h-12 w-12"/>
                </div>
            </div> : null}
        </div>
    )
}
export default Upload;