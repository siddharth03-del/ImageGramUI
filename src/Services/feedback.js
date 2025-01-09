import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";

export async function postFeedback(feedback){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const body = {text : feedback};
        console.log(token);
        const headers = {"x-access-token" : token};
        const response = await axios_instance.post('/feedback/post',body, {headers});
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}