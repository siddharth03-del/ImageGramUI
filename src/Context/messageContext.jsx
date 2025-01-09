import { useTabs } from "@material-tailwind/react";
import { createContext, useState } from "react";
const MessageContext = createContext(null);
import { io } from "socket.io-client";
import { renderUrl } from "../Helpers/storeUrl";
export const MessageContextProvider = ({children})=>{
    const socket = io(renderUrl);
    const [openSearchDialog, setOpenSearchDialog] = useState(false);
    const [ chatList, setChatList ] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [chats, setChats] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(false);
    socket.on('connect', ()=>{    
    if(!joinedRoom){
        socket.emit("JOINROOM", {
            userId : localStorage.getItem("userId")
        },
        (response) =>{
            console.log(response);
        } 
    )
    console.log("connected to server");
    setJoinedRoom(true);
    }
    })
    socket.on('disconnect', ()=>{
        console.log("disconnected from server");
        setJoinedRoom(false);
    })
    socket.on('NEW_MESSAGE', (data)=>{
        console.log(data, "new message");
        if(currentUser == data.receiver){
            setChats((prevChat)=>[...prevChat, data]);
        }
        console.log(chats);
    })
    return (
        <MessageContext.Provider value={{openSearchDialog, setOpenSearchDialog , chatList, setChatList , currentUser, setCurrentUser, chats, setChats, socket}}>
            {children}
        </MessageContext.Provider>
    )
}
export default MessageContext;