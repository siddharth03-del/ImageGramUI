import axios_instance from "../Helpers/axiosInstance";
export async function sendOTPRequest(email){
    try{
        const body = {email : email};
        const response = await axios_instance.post('/user/sendotp', body);
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function verifyOTPRequest(email, OTP){
    try{
        const body = {email : email, otp : OTP};
        const response = await axios_instance.post('/user/verifyotp', body);
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}