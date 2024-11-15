import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser , getToken } from "../Helpers/storeToken";
export async function createPost(formdata){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        console.log(formdata);
        const body = formdata
        const response = await axios_instance.post('/posts', body , {headers});
        console.log(response);
        return response.data;
    }catch(error){
        console.error(error);
    }
}