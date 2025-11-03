import commonAPI from "./commonApi";
import server_url from "./server_url";

// API for Register

export const registerAPI=async(reqBody)=>{
  return await commonAPI('POST',`${server_url}/`,reqBody)
}
// API for login

export const loginAPI=async(reqBody)=>{
 return await commonAPI("POST",`${server_url}/login`,reqBody)
}