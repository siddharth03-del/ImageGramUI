import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser , getToken} from "../Helpers/storeToken";
export const fetchFeed = async(page)=>{
    try{
        console.log("fetch feed called");
        const currentUser = fetchCurrentUser();
        console.log(currentUser);
        const token = getToken(currentUser);
        console.log(token);
        const headers = {"x-access-token" : token};
        const params = {page : page, limit : 7};
        const response = await axios_instance.get('/user/feedall', {headers, params});
        console.log(response, "fetchFeed");
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}