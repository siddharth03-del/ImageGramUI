import { useEffect, useState } from "react";
import { FetchUsers } from "../Services/fetchUsers";
import ProfileImage from "../Profile/userImage";
import { MyContext } from "../context";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
function Explorer(){
    const [users, setUsers] = useState(null);
    const [text, setText] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        async function handleInputChange(prefix){
            setImageLoading(true);
            const response = await FetchUsers(prefix);
            console.log(response);
            setUsers(response);
            setImageLoading(false);
        }
        handleInputChange(text);
    },[text]);
    return(
        <MyContext.Provider value={imageLoading}>
        <div className="ml-10 w-full">
            <div>
                <input type="text" value={text} placeholder="Type here" className="w-10/12 input input-bordered" onChange={(e)=>{setText(e.target.value)}}/>
            </div>
            <div className="mt-7 overflow-y-scroll h-[calc(100vh-9rem)]">
                {
                    users && users.map((user, index)=>{
                        return(
                            <div key={index} className="flex flex-row my-2 align-middle cursor-pointer" onClick={()=>{navigate(`/homepage/explore/${user.username}`)}}>
                                {
                                    user.image ?
                                    <ProfileImage imageUrl={user.image} width={10} height={10}/>
                                    :
                                    <UserCircleIcon className="w-10 h-10"/>
                                }
                                <div className="flex flex-col justify-center ml-2">
                                    <p className="font-bold">{user.username}</p>
                                    <p className="">{user.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </MyContext.Provider>

    )
}
export default Explorer;