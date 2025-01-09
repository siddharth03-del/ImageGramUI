import axios_instance from "../Helpers/axiosInstance";
import { fetchCurrentUser, getToken } from "../Helpers/storeToken";

export async function generatePrompt(prompt){
    try{
        console.log("Generating prompt...");
        const currentUser = fetchCurrentUser();
        const token = getToken(currentUser);
        const headers = {"x-access-token" : token};
        const params = {prompt : prompt};
        const response = await axios_instance.get('/gemini/prompt', {headers, params});
        console.log(response);
        return response.data.message.response.candidates[0].content.parts[0].text;
    }catch(error){
        console.log(error);
        return error.message;
    }
}