import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function showComments(content_id, type){
    try{
        const current_user = fetchCurrentUser();
        const token = getToken(current_user);
        const headers = {"x-access-token" : token};
        const params = {type: type, content_id: content_id}
        const response = await axios_instance.get("/comments/showall", {headers, params});
        console.log(response);
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}