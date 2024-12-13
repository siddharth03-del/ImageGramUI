import axios_instance from "../Helpers/axiosInstance";

export async function ChangePasswordRequest(email, password){
    try{
        const token = sessionStorage.getItem('resetPassword');
        const headers = {"change-password" : token};
        const body = {email, password};
        const response = await axios_instance.post('/user/changeaccountpassword', body, {headers});
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}