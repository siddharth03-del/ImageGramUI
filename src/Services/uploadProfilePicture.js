import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";

export async function UpdateProfile(formdata){
    try{
        const currenUser = fetchCurrentUser();
        const token = getToken(currenUser);
        const headers = {"x-access-token" : token};
        const body = formdata;
        const response = await axios_instance.post('/profile/update', body, {headers});
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}