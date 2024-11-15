import { useState , useEffect} from "react";
import { DefaultGallery } from "./Gallery";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { fetchAllPosts } from "../Services/fetchAllPosts";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import '../App.css'
function Profile(){
    const [posts, setPosts] = useState(null);
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
    return(
        <div className="w-full h-full">
            <div className="overflow-y-scroll h-[calc(100vh-4rem)] max-w-fit mx-auto">
                <div className="flex flex-row align-middle">
                    <div>
                        <UserCircleIcon className="h-20 w-20"/>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1>Siddharth Singh</h1>
                    </div>
                </div>
                <div className="mt-10">
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div>
                        <DefaultGallery data={posts}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;