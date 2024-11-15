import axios_instance from "../Helpers/axiosInstance";
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