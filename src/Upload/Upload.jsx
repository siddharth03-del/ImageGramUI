import { useState } from "react";
import { createPost } from "../Services/createPost";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import {useToast} from '../hooks/use-toast';
import {DocumentArrowUpIcon} from "@heroicons/react/24/solid"
import { useRef } from "react";
import { useQueryClient } from "react-query";
export function Upload(){
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageUrl , setImageUrl] = useState(null);
    const navigate = useNavigate(null);
    const [isLoading, setisLoading] = useState(false);
    const {toast} = useToast();
    const imageUploadRef = useRef(null);
    const queryClient = useQueryClient();
    function handleImageUpdate(event){
        const file = event.target.files[0];
        console.log(file);
        setFile(file);
        setImageUrl(URL.createObjectURL(file));
    }
    const handleUpload  = async(e)=>{
        e.preventDefault();
        if(file.size > 1024*1024){
            toast({
                title : "Image Upload Failed",
                description : "Image size exceeds the maximum allowed size of 1MB"
            })
            return;
        }
        else{
            setisLoading(true);
            const formdata = new FormData();
            formdata.append("image", file);
            formdata.append("caption" , caption);
            const res = await createPost(formdata);
            queryClient.invalidateQueries('feed');
            console.log(res);
            setisLoading(false);
            navigate("/homepage/profile");
        }
        return;
    }
    return(
        <div className="w-full h-[calc(100vh-4rem)] relative z-0">
            <div className="ml-10 h-full z-0 absolute">
                <div className="w-[500px] h-[400px] bg-blue-gray-50 rounded-3xl">
                    {imageUrl 
                    ? 
                    <img src={imageUrl} alt = "upload your image" className="max-w-[500px] max-h-[400px] rounded-3xl"/>
                    :
                    <div className="w-full h-full flex flex-row justify-center content-center">
                        <DocumentArrowUpIcon className="w-20 h-20 my-auto hover:cursor-pointer" onClick={()=>{imageUploadRef.current.click()}}/>
                    </div>
                }
                </div>
                <form action="sumit" onSubmit={handleUpload} className="mt-2">
                    <div>
                        <input type="file" name="image" onChange={(e)=>{ handleImageUpdate(e)}} ref={imageUploadRef} required/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="caption">Enter the caption : </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-white" onChange={(e)=>{setCaption(e.target.value)}} required/>
                    </div>
                    <div>
                        <button className="btn btn-info"  type="submit">Upload</button>
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