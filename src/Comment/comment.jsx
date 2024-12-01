import { useState , useEffect} from "react";
import { showComments } from "../Services/showComments";
import CommentStructure from "./commentStructure";
import CreateComment from "./createComment";
import { MyContext } from "../context";
import { useContext } from "react";
import { useQuery } from "react-query";
function Comment({content_id}){
    const [comments, setComments] = useState(null);
    const [rerender, setrender] = useState(false);
    const [comment, setComment] = useState(null);
    const [commentType, setCommentType] = useState("post");
    const [createCommentId, setCreateCommentId] = useState(content_id);
    const postId = content_id;
    useQuery(["comments", content_id, rerender], async()=>{
        const response = await showComments(content_id, commentType);
        setComments(response);
        return response;
    }, {
        cacheTime : 1000*60*10
    })
    
    return(
        <MyContext.Provider value={{comment, setComment, rerender, setrender, commentType, setCommentType, createCommentId, setCreateCommentId, postId}}>
            <div className="w-full h-full">
            <div>
                {comments && comments.map((element, index)=>{
                    return(
                        <div key={index}>
                            <CommentStructure comment_id={element._id}/>
                        </div>
                    )
                })}
            </div>
            <CreateComment />
        </div>
        </MyContext.Provider>
    )
}
export default Comment;