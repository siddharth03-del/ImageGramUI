import { useContext } from "react";
import MessageContext from "../Context/messageContext";
import { SearchUserDialog } from "./SearchUserDialog";
function Suggestion(){
    const {openSearchDialog, setOpenSearchDialog} = useContext(MessageContext);
    return(
        <div className="h-[calc(100vh-6rem)] w-full bg-gray-200 flex flex-col justify-center content-center" >
            <div className="mx-auto">
                <h1 className="font-bold">
                    Starting chatting with anyone you find intersting
                </h1>
                <button className="border-2 border-black px-1 py-1 bg-blue-600 text-white rounded-lg mt-2 mx-auto hover:shadow-2xl" onClick={()=>{setOpenSearchDialog(!openSearchDialog)}}>
                    Send Message
                </button>
                <SearchUserDialog/>
            </div>
        </div>
    )
}
export default Suggestion;