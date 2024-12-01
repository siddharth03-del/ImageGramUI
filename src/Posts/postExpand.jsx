import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchPost } from "../Services/fetchAllPosts";
import Comment from "../Comment/comment";
import { HeartIcon } from "@heroicons/react/16/solid";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import { createPostLike } from "../Services/createPostLike";
import { isPostLiked } from "../Services/isPostLiked";
import { fetchLikeOnPost } from "../Services/fetchLikeOnPost";
import { useQuery } from "react-query";
import {UserCircleIcon } from "@heroicons/react/16/solid";
function PostExpand(){
    const {postId} = useParams();
    const [open, setOpen] = useState(true);
    const [post, setPost] = useState(null);
    const [countLike, setcountLike] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchPostHelper(postId){
            const response = await fetchPost(postId);
            console.log(response);
            setPost(response);
        }
        fetchPostHelper(postId);
    },[]);
    const {data : like} = useQuery(["liked", postId], 
        () => isPostLiked(postId),
        {
            cacheTime : 1000*60*30,
            staleTime : 1000*60*30
        }
    )
    const {data : countlike} = useQuery(["countlikes", postId], 
        () => fetchLikeOnPost(postId),
        {
            cacheTime : 1000*60*30,
            staleTime : 1000*60*30
        }
    )
    useEffect(()=>{
        setLiked(like);
    }, [like])
    useEffect(()=>{
        setcountLike(countlike);
    },[countlike]);
    function closeHelper(){
        setOpen(false);
        navigate(-1);
    }
    function handlePostLike(){
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        setLiked(liked + 1);
        setcountLike(countLike + 1);
        createPostLike(token, postId);
    }
    return(
        <Dialog size="lg" open={open}>
            <DialogHeader>
                <button type="button" onClick={()=>{closeHelper()}} > X </button>
            </DialogHeader>
            <DialogBody>
                <div className="flex flex-row h-[calc(100vh-10rem)]">
                    <div className="h-full w-1/2 flex flex-col justify-center">
                        <div className=" ">
                            <img src={post && post.image} alt="new post" className="max-h-[calc(100vh-12rem)]"/>
                        </div>
                    </div>
                    <div className="h-full w-1/2 flex flex-col ml-5">
                    <div className="flex flex-row align-middle mb-1">
                <div>
                {
                    post && post.userProfile.image ?
                    <div className="flex items-center justify-center">
                    <img
                      src={post && post.userProfile.image}
                      alt="Profile"
                      className={`rounded-full w-${10} h-${10} object-cover border-2 border-gray-300`}
                    />
                    </div>
                    :
                    <UserCircleIcon className="w-10 h-10"/>
                }
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="font-bold ml-2">{post && post.user.username}</h1>
                </div>
            </div>
                        <div className="h-5/6">
                         <Comment content_id={postId}/>
                        </div>
                        <div className="border-t-2 h-1/6 flex flex-row">
                            <div className="flex ">
                                {liked?
                                <HeartIcon className="w-8 h-8"/>
                                :
                                <HeartIcon className="w-8 h-8 cursor-pointer" style={{ fill: "none", stroke: "currentColor" }} onClick={handlePostLike}/>}
                                <p className="text-xl text-gray-600 ml-2 mr-2">{countLike}</p>
                            </div>
                            <div className="mt-1">
                                <svg aria-label="Comment"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Comment</title>
                                    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    )
}
export default PostExpand;