import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "./Services/verifyToken";
function Welcome(){
    const navigate = useNavigate();
    useEffect(()=>{
        async function Helper(){
            const response = await verifyToken();
            if(response.valid){
                navigate("/homepage/posts");
            }
            else{
                navigate("/signin");
            }
        }
        Helper();
    })
    return(
        <div className="w-full h-full flex justify-center align-middle">
            <div className="flex flex-col mt-20">
                <div className="mb-36">
                    <p className="text-purple-700 font-bold text-3xl font-serif">Welcome to ImageGram</p>
                </div>
                <div className="flex flex-row justify-center">
                    <Spinner className="w-20 h-20"/>
                </div>
            </div>
        </div>
    )
}
export default Welcome;