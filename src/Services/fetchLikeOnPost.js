import axios_instance from "../Helpers/axiosInstance"
export const fetchLikeOnPost = async(token, post_id)=>{
    try{
        console.log(token);
        const headers = {"x-access-token" : token};
        const params = {post : post_id};
        const response = await axios_instance.get('/like/countlikepost', {params,headers});
        console.log(response.data);
        return response.data.message;
    }catch(error){
        console.log(error);
    }
}