import { useState } from "react"
import { Avatar } from "@material-tailwind/react";
import ImageGramLogo from "../assets/ImageGram Logo.jpeg";
import { postFeedback } from "../Services/feedback";
function Feedback(){
    const [text, setText ] = useState('');
    const [feedbackChat, setFeedbackChat] = useState([]);
    async function helper(e){
        e.preventDefault();
        setFeedbackChat((prevChat)=>[...prevChat, {text : text}]);
        setText('');
        const response = await postFeedback(text);
        setFeedbackChat((prevChat)=>[...prevChat, {text : "Thanks for feedback!"}]);
    }
    return(
                <div className="w-full h-[calc(100vh-6rem)]  flex flex-col">
                    <div className="w-full h-2/12 bg-white flex flex-row">
                        <div className="ml-4">
                            <Avatar variant="circular" alt="candice" src={ImageGramLogo}/>
                        </div>
                        <div className="ml-2 flex flex-col">
                            <h1 className="mt-2 font-bold">
                                ImageGram Feedback
                            </h1>
                        </div>
                    </div>
                    <div className="h-[calc(100vh-10rem)] overflow-y-scroll bg-gray-200">
                        {
                            feedbackChat && feedbackChat.map((chat, index)=>{
                                return (<div key={[chat, index]} className="mt-2">
                                    <div className="mx-2">
                                    {  index % 2 != 0
                                        ? 
                                        <h1 className="text-bold bg-gray-300 w-fit rounded-lg px-2 py-2">{chat.text}</h1>
                                        :
                                        <h1 className="text-bold w-fit rounded-lg px-2 py-2 ml-auto bg-blue-300">{chat.text}</h1>
                                    }
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <div className="w-full flex flex-row h-1/12 mt-4">
                        <form action="submit" onSubmit={(e)=>{helper(e)}} className="w-full flex flex-row full mt-4">
                            <div className=" w-10/12">
                                <input value={text} type="text" placeholder="Type here" className="input input-bordered w-full" onChange={(e)=>{setText(e.target.value)}}/>
                            </div>
                            <div className="w-2/12 ml-2">
                                <button className="btn btn-info" type="submit">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    )
}
export default Feedback;