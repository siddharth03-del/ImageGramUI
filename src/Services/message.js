import axios from "axios";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import axios_instance from "../Helpers/axiosInstance";

export async function fetchMessages(details){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const params = details;
        const headers = {"x-access-token" : token};
        const response = await axios_instance.get('/message/getAll', {headers, params});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}