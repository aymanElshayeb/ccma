import axios from "axios";
import ccmaCofig from "../ccmaConfig.json"
export const ccmaInstance = axios.create({
    baseURL: ccmaCofig.baseURL
});
ccmaInstance.interceptors.request.use(request => {
    if(ccmaCofig.LOG_LEVEL==="INFO"){
        console.log('Starting Request: URL ', request.url, 'method', request.method);
    } else if(ccmaCofig.LOG_LEVEL==="DEBUG"){
        console.log('Starting Request', JSON.stringify(request, null, 2))
    }

    return request
})

ccmaInstance.interceptors.response.use(response => {
    if(ccmaCofig.LOG_LEVEL==="INFO"){
        console.log('Response status:', response.status,' response for: URL ', response.config.url, 'method:', response.config.method);
    } else if(ccmaCofig.LOG_LEVEL==="DEBUG"){
        console.log('Response:', JSON.stringify(response, null, 2))
    }

    return response
})