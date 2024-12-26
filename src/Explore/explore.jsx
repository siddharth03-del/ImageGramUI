import { useEffect, useState } from "react";
import { FetchUsers } from "../Services/fetchUsers";
import ProfileImage from "../Profile/userImage";
import { MyContext } from "../context";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Spinner } from "@material-tailwind/react";
import  SearchUserImage from "../assets/An impressive laptop for a social media application search feature.png";
import UserNotFound from "../assets/user searching for a username not found.png";
function Explorer(){
    // const [users, setUsers] = useState(null);
    const [text, setText] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const navigate = useNavigate();
    
    const {data : users, isLoading} = useQuery([`the user for ${text}`, text], 
        ()=>FetchUsers(text),
        {
            cacheTime : 1000 * 10,
            retry : 5
        }
    )
    useEffect(()=>{
        console.log(isLoading, "isLoading");
        console.log(text, "text");
        console.log(users, "users");
    },[isLoading, text, users])
    return(
        <MyContext.Provider value={isLoading}>
        <div className="ml-10 w-full">
            <div>
                <input type="text" value={text} placeholder="Type here" className="w-10/12 input input-bordered bg-white" onChange={(e)=>{setText(e.target.value)}}/>
            </div>
            {(!isLoading && text && (users && users.length != 0)) && <div className="mt-7 overflow-y-scroll h-[calc(100vh-8.75rem)]">
                {
                    users && users.map((user, index)=>{
                        return(
                            <div key={index} className="flex flex-row my-2 align-middle cursor-pointer hover:bg-gray-200 rounded-xl mr-5 h-10" onClick={()=>{navigate(`/homepage/explore/${user.username}`)}}>
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
            }
            {(isLoading && text && !users) && <div className="h-[calc(100vh-7rem)] flex flex-col justify-center content-center w-full">
                <div className="flex flex-row h-fit w-fit mx-auto">
                    <h1 className="text-lg text-purple-500 pt-2 text-justify font-bold">Please wait...</h1>
                    <Spinner className="w-10 h-10 ml-5 " color="purple"/>
                </div>
            </div>
            }
            {(!isLoading && text && (users && users.length == 0)) 
            &&
            <div className="h-[calc(100vh-7rem)] flex flex-row justify-center content-center">
                {/* <div className="h-fit w-fit my-auto">
                    <h1 className="font-bold text-lg text-purple-500">Oops, no user found</h1>
                </div> */}
                <div className="h-5/6 my-auto">
                    <img src={UserNotFound} alt="Enter username to serarch for users" className="max-h-full max-w-full rounded-3xl" />
                </div>
            </div>
            }
            {(!isLoading && !text && !users)
            &&
            <div className="h-[calc(100vh-7rem)] flex flex-row justify-center content-center my-auto">
                {/* <div className="h-fit w-fit my-auto">
                    <h1 className="font-bold text-lg text-purple-500">Enter the usersname to search for users</h1>
                </div> */}
                <div className="h-5/6 my-auto">
                    <img src={SearchUserImage} alt="Enter username to serarch for users" className="max-h-full max-w-full rounded-3xl" />
                </div>
            </div>
            }
        </div>
        </MyContext.Provider>
    )
}
export default Explorer;