import { useState , useEffect} from "react";
import { DefaultGallery } from "./Gallery";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import '../App.css';
import { fetchExploreProfile } from "../Services/fetchProfile";
import UserImage from "./userImage";
import UserDetail from "./userDetail";
import { MyContext } from "../context";
import { useParams } from "react-router-dom";
function ExploreProfile(){
    const [profile, setProfile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [size, setSize] = useState(null);
    const {username} = useParams();
    useEffect(()=>{
        async function fetchExploreProfileHelper(username){
            const response = await fetchExploreProfile(username);
            console.log(response);
            setProfile(response);
        }
        fetchExploreProfileHelper(username);
    },[]);
    return(
        <MyContext.Provider value={{imageLoading, setImageLoading, size, setSize}}>
        <div className="w-full h-full">
            {profile && 
            <div className="overflow-y-scroll h-[calc(100vh-4rem)] w-[calc(w-full - 3rem)] ml-10 mx-auto">
            <div className="flex flex-row align-middle">
                <div>
                    {
                    profile.image ?
                    <UserImage imageUrl={profile.image} width={32} height={32}/>
                     : 
                     <UserCircleIcon className="h-32 w-32"/>
                     }
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row ml-10">
                        <div className="flex flex-col justify-center">
                            <h1 className="font-bold text-xl font-mono" >{profile.user && profile.user.username}</h1>
                        </div>
                    </div>
                    <div>
                        <UserDetail followers={profile && profile.followers} following={profile && profile.following} posts={profile.posts}  bio={profile.bio} name={profile.name}/>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div>
                    <DefaultGallery data={profile && profile.allposts}/>
                </div>
            </div>
        </div>}
        </div>
        </MyContext.Provider>

    )
}
export default ExploreProfile;