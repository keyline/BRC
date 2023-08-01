import axios from "axios";
import { BASE_URL } from "./constants";



export const Network = (method, endpoint, data = {}) => {

    return fetch = new Promise(async (resolve, reject) => {
        try {
            let config = {
                method: method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }
            if (__DEV__) {
                console.log('EndPoint ', endpoint);
                console.log('PayLoad ', JSON.stringify(data));
            }
            axios.request(config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject('Something Went Wrong');
                    }
                })
        } catch (error) {
            reject(error);
        }
    })
}