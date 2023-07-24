import axios from "axios";
import { BASE_URL } from "./constants";



export const Network = (method, endpoint, data = {}) => {

    return fetch = new Promise(async (resolve, reject) => {
        // var token = ''
        try {
            // const accessToken = await AsyncStorage.getItem('accessToken');
            // if (accessToken) {
            //     token = accessToken;
            //     if (__DEV__) {
            //         console.log('AccessToken', accessToken)
            //     }
            // }
            let config = {
                method: method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }
            axios.request(config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject('Something Went Wrong');
                    }
                })
            // axios.post(`${BASE_URL}${endpoint}`, data, {
            //     headers: {
            //         "Accept": "multipart/form-data",
            //         "content-type": "application/json",
            //         'Authorization': 'Bearer ' + token
            //     }
            // })
        } catch (error) {
            reject(error);
        }
    })
}