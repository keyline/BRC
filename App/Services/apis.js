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

    static change_password = (data) => {
        return Network('post', 'change-password', data)
    }

    static update_profile = (data) => {
        return Network('post', 'update-profile', data)
    }

    static get_myBills = (data) => {
        return Network('post', 'my-bills', data)
    }

    static get_paymentList = (data) => {
        return Network('post', 'payment-list', data)
    }

    static get_paymentDetails = (data) => {
        return Network('post', 'payment-details', data)
    }

    static get_tableDiningSpace = (data) => {
        return Network('post', 'get-table-dining-space', data)
    }

    static get_tableTimeSlots = (data) => {
        return Network('post', 'get-table-timeslots', data)
    }

}