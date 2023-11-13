import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";
// register
export const registerAPI=async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}