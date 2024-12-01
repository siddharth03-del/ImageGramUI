import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function isCommentLiked(commentId){
    try{
        const current_user = fetchCurrentUser();
        const token = getToken(current_user);
        const params = {comment : commentId};
        const headers = {"x-access-token" : token};
        const response = await axios_instance.get("like/iscommentliked", {params, headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}