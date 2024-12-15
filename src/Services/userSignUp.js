import axios_instance from "../Helpers/axiosInstance";
export async function userSingUp(username, email, password){
    try{
        const body = {username, email ,password};
        console.log(body);
        const response = await axios_instance.post('/user/signup', body );
        console.log(response);
        return response.data;
    }catch(error){
        console.error(error);
        if(error.response.status == 400){
            alert(error.response.data.message);
        }
        throw error;
    }
}