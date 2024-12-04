import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
export function PostFrame({img, caption, username, profileImage}){
    const navigate = useNavigate();
    return(
        <div className="w-full h-full flex flex-col mb-2">
            <div className="flex flex-row align-middle mb-1">
                <div className="flex flex-row align-middle w-fit hover:cursor-pointer" onClick={()=>{navigate(`/homepage/explore/${username}`)}}>
                    <div>
                    {
                        profileImage ?
                        <div className="flex items-center justify-center">
                        <img
                        src={profileImage}
                        alt="Profile"
                        className={`rounded-full w-${10} h-${10} object-cover border-2 border-gray-300`}
                        />
                    </div>
                        :
                        <UserCircleIcon className="w-10 h-10"/>
                    }
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold ml-2">{username}</h1>
                    </div>
                </div>
            </div>
            <div className="relative w-96 h-96 overflow-hidden">
                <img src={img} alt="Image" className="absolute top-0 left-0 w-full h-full object-cover"/> 
            </div>
            <div className="flex flex-row mt-2">
                <p className="font-bold mr-2 font-mono">{username}</p>
                <p className="text-base">{caption}</p>
            </div>
        </div>
    )
}