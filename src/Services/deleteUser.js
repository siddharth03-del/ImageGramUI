import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";

export async function deleteUserAccount(){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const response = await axios_instance.delete('/user/deleteUser', {headers});
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}