import { useState } from "react";
import { createPost } from "../Services/createPost";
function CreatePost(){
    const [file, setFile] = useState('');
    const [caption, setCaption] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append("caption" , caption);
        const res = await createPost(formdata);
        console.log(res);
        window.location.reload();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Upload photo </label>
                    <input type="file" name="photo" id="file"
                     onChange={(e)=>{setFile(e.target.files[0])}}
                     required/>
                </div>
                <div>
                    <label htmlFor="caption">Enter caption</label>
                    <input type="text" name="caption" id="caption"
                    onChange={(e)=>{setCaption(e.target.value)}}
                    value={caption}
                    required
                    />
                </div>
                <button type="submit"> submit </button>
            </form>
        </div>
    )
}
export default CreatePost;