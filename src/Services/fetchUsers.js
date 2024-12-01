import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
export async function FetchUsers(prefix){
    try{
        const currenUser = fetchCurrentUser();
        const token = getToken(currenUser);
        const headers = {"x-access-token" : token};
        const params = {prefix : prefix, page : 1};
        const response = await axios_instance.get('/user/all', {headers, params});
        console.log(response);
        return response.data.data.users;
    }catch(error){
        console.log(error);
        return null;
    }
}