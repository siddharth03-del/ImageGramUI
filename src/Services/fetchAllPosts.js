import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export const fetchAllPosts = async(token) =>{
    try{
        const headers = {'x-access-token' : token};
        const response = await axios_instance.get('/posts', {headers});
        console.log(response);
        const r = response.data.data.posts;
        console.log(r);
        return r;
    }catch(error){
        console.error(error);
    }
}

export const fetchPost = async(postId) => {
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {'x-access-token' : token};
        const params = {postId};
        const response = await axios_instance.get('/posts/single', {params, headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}