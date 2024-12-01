import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function createCommentLike(comment){
    try{
        const current_user = fetchCurrentUser();
        const token = getToken(current_user);
        const headers = {"x-access-token" : token};
        const body = {comment_id : comment};
        const response = await axios_instance.post("/like/comment", body, {headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}