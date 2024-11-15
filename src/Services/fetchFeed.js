import axios_instance from "../Helpers/axiosInstance";
export const fetchFeed = async(token)=>{
    try{
        const headers = {"x-access-token" : token};
        const response = await axios_instance.get('/user/feedall', {headers});
        console.log(response, "fetchFeed");
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}