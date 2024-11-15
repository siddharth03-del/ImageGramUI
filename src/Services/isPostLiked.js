import axios_instance from "../Helpers/axiosInstance";
export async function isPostLiked(token, post_id){
    try{
        const headers = {"x-access-token" : token};
        const params = {post : post_id};
        const response = await axios_instance.get('/like/ispostliked', {params, headers});
        console.log(response);
        return response.data.message; 
    }catch(error){
        console.log(error);
        return null;
    }
}