import { useState , useEffect} from "react";
import { DefaultGallery } from "./Gallery";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { fetchAllPosts } from "../Services/fetchAllPosts";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import '../App.css'
import { fetchProfile } from "../Services/fetchProfile";
import UserImage from "./userImage";
import UserDetail from "./userDetail";
import { UploadProfilePictureDialog } from "./uploadProfileImage";
import { MyContext } from "../context";
import { UpdateProfileDialog } from "./updateProfileDialog";
function Profile(){
    const [posts, setPosts] = useState(null);
    const [profile, setProfile] = useState({});
    const [imageUpload, setImageUploader] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [profileReRender, setProfileReRender] = useState(false);
    const [size, setSize] = useState(null);
    useEffect(()=>{
        async function fetchAllPostsHelper(){
            const currentUser = fetchCurrentUser();
            const token = getToken(currentUser);
            const reponse = await fetchAllPosts(token);
            console.log(reponse);
            setPosts(reponse);
        }
        fetchAllPostsHelper();
    },[]);
    useEffect(()=>{
        console.log("Profile re rerendered");
        async function fetchProfileHleper(){
            const res = await fetchProfile();
            console.log(res);
            setProfile(res);
            setImageLoading(false);
            console.log("Profile re rerendered after");
        }
        fetchProfileHleper();
    },[profileReRender]);
    useEffect(()=>{
        {(Object.keys(profile).length != 0) && !profile.image && window.setTimeout(()=>{
            if(!imageUpload && !size){
                setImageUploader(!imageUpload);
            }
        }, 8000)}
    },[profile]);
    useEffect(()=>{
        {(Object.keys(profile).length != 0) && !profile.name && !profile.bio && window.setTimeout(()=>{
            if(!imageUpload){
                setSize("lg");
            }
        }, 3000)}
    },[profile]);
    return(
        <MyContext.Provider value={{imageLoading, setImageLoading, setProfileReRender, profileReRender, size, setSize}}>
        <div className="w-full h-full">
            <div className="overflow-y-scroll h-[calc(100vh-4rem)] w-[calc(w-full - 3rem)] mx-auto ml-10">
                <div className="flex flex-row align-middle">
                    <div onClick={()=>{setImageUploader(!imageUpload); console.log("clicked")}} className="hover:cursor-pointer">
                        {
                        profile.image ?
                        <UserImage imageUrl={profile.image} width={32} height={32}/>
                         : 
                         <div>
                            <UserCircleIcon  className="h-32 w-32"/>
                            <h1 className="font-bold">Upload your image above</h1>
                         </div>
                         }
                    </div>
                    <div>
                        <UploadProfilePictureDialog ImageUploader={imageUpload} setImageUploader={setImageUploader}/>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row ml-10">
                            <div className="flex flex-col justify-center">
                                <h1 className="font-bold text-xl font-mono" >{profile.user && profile.user.username}</h1>
                            </div>
                            <div>
                                <button className="btn ml-5 bg-white" onClick={()=>{setSize("lg")}}>Edit profile </button>
                            </div>
                            {profile && <div>
                                <UpdateProfileDialog previousBio={profile.bio} previousName={profile.name}/>
                            </div>}
                        </div>
                        <div>
                            <UserDetail followers={profile.followers} following={profile.following} posts={profile.posts}  bio={profile.bio} name={profile.name}/>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div>
                        <DefaultGallery data={posts}/>
                    </div>
                </div>
            </div>
        </div>
        </MyContext.Provider>

    )
}
export default Profile;