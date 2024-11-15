import axios_instance from "../Helpers/axiosInstance";
export async function userSingIn(email , password){
    try{
        const body = {email , password};
        console.log(body);
        const response = await axios_instance.post('/user/signin', body);
        console.log(response);
        return response.data.user;
    }catch(error){
        console.error(error);
    }
}