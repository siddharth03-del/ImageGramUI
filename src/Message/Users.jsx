import { Outlet } from "react-router-dom"
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import ImageGramLogo from "../assets/ImageGram Logo.jpeg";
import AILogo from "../assets/AI Logo.jpeg";
import MessageContext from "../Context/messageContext";
import { useContext, useEffect } from "react";
import UserImage from "../assets/vector-sign-of-user-icon.jpg";
import { useNavigate } from "react-router-dom";
function Users(){
    const {chatList} = useContext(MessageContext);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(chatList);
    }, [chatList]);
    return(
        <>
            <div className="ml-5 w-[16.5rem] min-w-[16.5rem] h-[calc(100vh-6rem)] overflow-y-scroll mt-5">
                <Card className="w-60">
                    <List>
                    <ListItem onClick={()=>{navigate("/homepage/message/t/feedback")}}>
                        <ListItemPrefix>
                        <Avatar variant="circular" alt="candice" src={ImageGramLogo} />
                        </ListItemPrefix>
                        <div>
                        <Typography variant="h6" color="blue-gray">
                            ImageGram
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Give us feedback
                        </Typography>
                        </div>
                    </ListItem>
                    <ListItem onClick={()=>{navigate("/homepage/message/t/chatwithai")}}>
                        <ListItemPrefix>
                        <Avatar variant="circular" alt="candice" src={AILogo}/>
                        </ListItemPrefix>
                        <div>
                        <Typography variant="h6" color="blue-gray">
                            ImageGram AI
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Chat with AI
                        </Typography>
                        </div>
                    </ListItem>
                    {
                        chatList && chatList.map((user)=>{
                            console.log(user);
                            return (<ListItem key={user.username} onClick={()=>{navigate(`/homepage/message/t/${user._id}`)}}>
                                <ListItemPrefix>
                                    <Avatar variant="circular" alt="candice" src={user.image ? user.image : UserImage}/>
                                </ListItemPrefix>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        {user.username}
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        {user?.name}
                                    </Typography>
                                </div>
                            </ListItem>)
                        })
                    }
                    </List>
                </Card>
            </div>
            <Outlet/>
        </>
    )
}
export default Users;
   