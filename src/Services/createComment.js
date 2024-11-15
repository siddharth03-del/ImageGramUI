import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function createComment(details){
    try{
        const text = details.text;
        const content_id = details.content_id;
        const type = details.type;
        const current_user = fetchCurrentUser();
        const token = getToken(current_user);
        const headers = {"x-access-token" : token};
        const body = {text, content_id, type};
        const response = await axios_instance.post("/comments/create", body, {headers});
        console.log(response);
    }catch(error){
        console.log(error);
    }
}