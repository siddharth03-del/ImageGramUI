import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
} from "@material-tailwind/react";
import { useContext } from "react";
import MessageContext from "../Context/messageContext";
import { useQuery } from "react-query";
import { FetchUsers } from "../Services/fetchUsers";
import ProfileImage from "../Profile/userImage";
import { LucideLoader2 } from "lucide-react";
import UserImage from "../assets/vector-sign-of-user-icon.jpg";
export function SearchUserDialog() {
  const {openSearchDialog, setOpenSearchDialog, chatList, setChatList} = useContext(MessageContext);
  const handleOpen = () => setOpenSearchDialog(!openSearchDialog);
  const [text, setText] = useState('');
  const [immediateChatList, setimmediateChatList] = useState([]);
  const {data : users, isLoading} = useQuery([`the user for ${text}`, text], 
          ()=>FetchUsers(text),
          {
              cacheTime : 1000 * 10000,
              retry : 5
          }
      )

  useEffect(()=>{
    setimmediateChatList([]);
  },[]);
  function handleClose(){
    setChatList([...chatList, ...immediateChatList]);
    setimmediateChatList([]);
    setOpenSearchDialog(false);
  }
  return (
    <>
      <Dialog open={openSearchDialog} handler={handleOpen} onClose={()=>{setimmediateChatList([])}}>
        <DialogHeader>
          Search Users to add into active chats
        </DialogHeader>
        <DialogBody>
          <div>
            <div>
              <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} className="w-[600px] border-solid border-black border-2 rounded-xl px-3 h-10" />
            </div>
            <div className="h-[300px] overflow-y-scroll mt-5">
            {
                    users && users.map((user, index)=>{
                        return(
                            <div key={index} className="flex flex-row my-2 align-middle cursor-pointer hover:bg-gray-200 rounded-xl h-14 w-full" onClick={()=>{
                              function hello(){
                                let a = document.getElementById(`${user.username}`);
                                
                                if(a.checked){
                                  a.checked = false;
                                  console.log(`${user.username}`);
                                  setChatList((array)=>{
                                    let a = structuredClone(array);
                                    a = a.filter((item)=>{item.username != user.username})
                                    return a;
                                  })
                                }else{
                                  a.checked = true;
                                  setimmediateChatList([...immediateChatList, user])
                                }
                                }
                              hello();
                            }}>
                                {
                                    <Avatar variant="circular" alt="candice" src={user.image ? user.image : UserImage}/>
                                }
                                <div className="flex flex-col justify-center ml-2">
                                    <p className="font-bold">{user.username}</p>
                                    <p className="">{user.name}</p>
                                </div>
                                <div className="ml-auto mr-5 my-auto">
                                  <input type="checkbox" name="checkbox" id={`${user.username}`} className="h-6 w-6 rounded-xl" />
                                </div>
                            </div>
                        )
                    })
                }
                {
                  isLoading && <div className="flex flex-row justify-center content-center">
                    <LucideLoader2 className="animate-spin w-20 h-20 my-auto"/>
                  </div>
                }
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
        <div>
          <button className="border-solid border-2 border-black px-2 py-1 rounded-xl text-white font-bold bg-blue-700 hover:shadow-xl" onClick={()=>{handleClose()}}>
            Add
          </button>
        </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}