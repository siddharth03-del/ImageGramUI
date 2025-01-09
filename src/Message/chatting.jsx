import MessageContext from "../Context/messageContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProfileOfAnotherUser } from "../Services/fetchProfile";
import { Avatar} from "@material-tailwind/react";
import UserImage from "../assets/vector-sign-of-user-icon.jpg";
import { fetchMessages } from "../Services/message";
import { scroll } from "../Helpers/scroll";
function Chatting(){
    const {userId} = useParams();
    const {chats, setChats, socket, currentUser, setCurrentUser} = useContext(MessageContext);
    const [text, setText] = useState('');
    const chatBox = useRef(null);
    const {data : profile} = useQuery([`getProfileOfUser${userId}`, userId],
        () => fetchProfileOfAnotherUser(userId),
        {
            cacheTime : Infinity,
            retry : 5
        }
    )
    const {data : messages} = useQuery([`getMessagesOfUser${userId}`, userId], 
        () => fetchMessages({sender : localStorage.getItem("userId") , receiver : userId}),
        {
            cacheTime : Infinity,
            retry : 5
        }
    )
    useEffect(()=>{
        scroll(chatBox);
    },[chats])
    useEffect(()=>{
        if(messages){
            console.log("added messages");
            setChats([...messages]);
        }
    }, [messages]);
    useEffect(()=>{
        setCurrentUser(userId);
    },[]);
    async function messageSender(e){
        e.preventDefault();
        if(text == ''){
            return;
        }
        let object = {
            sender : localStorage.getItem('userId'),
            receiver : userId,
            body : text
        }
        setChats((prevChat)=>[...prevChat, object]);
        socket.emit('MESSAGE', object,
        (response)=>{
            console.log(response);
        }
        )
        setText('');
        return;
    }
    return(
        <div className="w-full h-[calc(100vh-6rem)]  flex flex-col">
            <div className="w-full h-2/12 bg-white flex flex-row">
                <div className="ml-4">
                    <Avatar variant="circular" alt="candice" src={profile?.image ? profile.image : UserImage}/>
                </div>
                <div className="ml-2">
                    <h1 className="mt-2 font-bold">
                        {profile?.user?.username}
                    </h1>
                </div>
            </div>
            <div className="h-[calc(100vh-10rem)] overflow-y-scroll bg-gray-200" ref={chatBox}>
                {
                    chats && chats.map((chat, index)=>{
                        return (<div key={[chat, index]} className="mt-2">
                            <div className="mx-2">
                                { chat.sender == userId
                                ? 
                                <h1 className="text-bold bg-gray-300 w-fit rounded-lg px-2 py-2">{chat.body}</h1>
                                :
                                <h1 className="text-bold w-fit rounded-lg px-2 py-2 ml-auto bg-blue-300">{chat.body}</h1>
                            }
                            </div>
                        </div>)
                    })
                }
            </div>
            <div className="w-full flex flex-row h-1/12 mt-4">
                <form action="submit" onSubmit={(e)=>{messageSender(e)}} className="w-full flex flex-row full mt-4">
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
export default Chatting;