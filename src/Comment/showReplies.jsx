import CommentStructure from "./commentStructure";
function Replies({replies}){
    return(
        <div>
            {replies && replies.map((element, index)=>{
                return(
                    <div key={index} className="ml-2">
                        <CommentStructure comment_id={element}/>
                    </div>
                )
            })}
        </div>
    )
}
export default Replies;