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

    static get_table = (data) => {
        return Network('post', 'get-table-from-dining', data)
    }

    static book_table = (data) => {
        return Network('post', 'insert-table-booking', data)
    }

    static sportsList = (data) => {
        return Network('post', 'get-sports', data)
    }

    static sportsTimeSlots = (data) => {
        return Network('post', 'get-sports-timeslots', data)
    }

    static SportMemberList = (data) => {
        return Network('post', 'get-member-list', data)
    }

    static sportBook = (data) => {
        return Network('post', 'insert-sports-booking', data)
    }

    static sportBook_validate = (data) => {
        return Network('post', 'validate-sports-booking', data)
    }

    static sportBookOtp_resend = (data) => {
        return Network('post', 'regenerate-sports-otp', data)
    }

    static sportsMarkerTimeSlots = (data) => {
        return Network('post', 'get-sports-squash-coach-timeslots', data)
    }

    static tableBookingList = (data) => {
        return Network('post', 'table-booking-list', data)
    }

    static tableBooking_Cancel = (data) => {
        return Network('post', 'cancel-table-booking', data)
    }

    static sportsBookingList = (data) => {
        return Network('post', 'sports-booking-list', data)
    }

    static sportsBooking_Cancel = (data) => {
        return Network('post', 'cancel-sports-booking', data)
    }
}