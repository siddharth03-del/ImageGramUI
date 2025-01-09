import { fetchCurrentUser, getToken } from "../Helpers/storeToken";
import axios_instance from "../Helpers/axiosInstance";
export async function fetchProfile(){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const response = await axios_instance.get('/profile/getProfile',{headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function fetchExploreProfile(username){
    try{
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const params = {username};
        const response = await axios_instance.get('/profile/exploreProfile',{params ,headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function fetchProfileOfAnotherUser(userId){
    try{
        const currentUser= fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const params = {userId};
        const response = await axios_instance.get('/profile/getProfileOfAnotherUser', {params, headers});
        return response.data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}