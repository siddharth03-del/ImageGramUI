import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import { fetchFeed } from "../Services/fetchFeed";
import { useEffect, useState } from "react";
import { PostFrame } from "./postFrame";
import '../App.css'
import Interact from "../Interact/Interact";

export function Posts(){
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        async function fetchData(){
            const currentUser = fetchCurrentUser();
            console.log(currentUser);
            const token = getToken(currentUser);
            console.log(token);
            const feed = await fetchFeed(token);
            console.log(feed);
            setPosts(feed);
        }
        fetchData();
    },[]);
    useEffect(()=>{
        console.log(posts);
    },[posts]);
    return(
        <div className="h-full w-full flex-col align-middle">
            <div className="overflow-y-scroll h-[calc(100vh-4rem)] max-w-fit mx-auto scrollable-container">
            {
                posts && posts.map((element, index)=>{
                    {console.log(element)}
                    return(
                        <div key={index} className="w-[400px] h-fit">
                            <PostFrame img={element.image} caption={element.caption}/>
                            <Interact post_id={element._id}/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}