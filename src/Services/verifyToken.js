import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function verifyToken(){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const response = await axios_instance.get("/user/verifytoken", {headers});
        return response.data;
    }catch(error){
        console.log(error);
    }
}