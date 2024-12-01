import axios_instance from "../Helpers/axiosInstance"
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export const fetchLikeOnPost = async( post_id)=>{
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const params = {post : post_id};
        const response = await axios_instance.get('/like/countlikepost', {params,headers});
        console.log(response.data);
        return response.data.message;
    }catch(error){
        console.log(error);
    }
}