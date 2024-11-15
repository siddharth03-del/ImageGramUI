import axios_instance from "../Helpers/axiosInstance";
export function createPostLike(token, post_id){
    try{
        const headers = {"x-access-token" : token};
        const body = {post_id}
        const response = axios_instance.post('/like/post',body, {headers});
        return response;
    }catch(error){
        console.log(error);
    }
}