import { Avatar } from "@material-tailwind/react";
import AILogo from "../assets/AI Logo.jpeg";
import { useEffect, useState } from "react";
import { generatePrompt } from "../Services/gemini";
import { convertMarkdownToHtml } from "../Helpers/markdowntoHtml";
import parse from 'html-react-parser';
import { useRef } from "react";
import { scroll } from "../Helpers/scroll";
function ChatWithAI(){
    const [aiChats, setAiChats] = useState([]);
    const [text, setText] = useState('');
    const [thinking, setThinking] = useState(false);
    const aiChatBox = useRef(null);
    async function helper(e){
        e.preventDefault();
        if(text == ''){
            return;
        }
        setThinking(true);
        setAiChats((prevChat)=>[...prevChat, {text : text}]);
        setText('');
        const prompt = await generatePrompt(text);
        setThinking(false);
        setAiChats((prevChat)=>[...prevChat, {text : prompt}]);
        return;
    }
    useEffect(()=>{
        scroll(aiChatBox);
    },[aiChats])
    return(
        <div className="w-full h-[calc(100vh-6rem)]  flex flex-col">
            <div className="w-full h-2/12 bg-white flex flex-row">
                <div className="ml-4">
                    <Avatar variant="circular" alt="candice" src={AILogo}/>
                </div>
                <div className="ml-2 flex flex-col">
                    <h1 className="mt-2 font-bold">
                        ImageGram AI
                    </h1>
                    <h1 className="text-sm">
                        {thinking && "thinking..."}
                    </h1>
                </div>
            </div>
            <div className="h-[calc(100vh-10rem)] overflow-y-scroll bg-gray-200" ref={aiChatBox}>
                {
                    aiChats && aiChats.map((chat, index)=>{
                        return (<div key={[chat, index]} className="mt-2">
                            <div className="mx-2">
                            {  index % 2 != 0
                                ? 
                                <h1 className="text-bold bg-gray-300 w-fit rounded-lg px-2 py-2">{parse(convertMarkdownToHtml(chat.text))}</h1>
                                :
                                <h1 className="text-bold w-fit rounded-lg px-2 py-2 ml-auto bg-blue-300">{parse(convertMarkdownToHtml(chat.text))}</h1>
                            }
                            </div>
                        </div>)
                    })
                }
            </div>
            <div className="w-full flex flex-row h-1/12 mt-4">
                <form action="submit" onSubmit={(e)=>{helper(e)}}  className="w-full flex flex-row full mt-4">
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
export default ChatWithAI;