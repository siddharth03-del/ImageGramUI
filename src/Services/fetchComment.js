import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function fetchComment(comment_id){
    try{
        console.log(comment_id);
        const current_user = fetchCurrentUser();
        const token = getToken(current_user);
        const headers = {"x-access-token": token};
        const params = {comment_id: comment_id};
        const response = await axios_instance.get('/comments/showone',{params, headers});
        console.log(response);
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}