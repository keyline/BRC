import { Network } from "./network"

export default class Apis {

    static sign_in = (data) => {
        return Network('post', 'signin', data)
    }

    static forgot_password = (data) => {
        return Network('post', 'forgot-password', data)
    }

    static sign_out = (data) => {
        return Network('post', 'signout', data)
    }

    static get_profile = (data) => {
        return Network('post', 'get-profile', data)
    }
}