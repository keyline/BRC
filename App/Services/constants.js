import { Dimensions, Platform } from "react-native"


// export const BASE_URL = "https://bengalrowingclub.keylines.in/index.php/api/"
export const BASE_URL = "https://brcdev.keylines.in/index.php/api/"
export const KEY = "c99b9114090f82bc81ae8cff319085ae"
export const SOURCE = Platform.OS.toUpperCase()

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const TABLEBOOKING_TERMS = "https://www.bengalrowingclub.com/index.php/members/booking_terms/table"
export const SPORTBOOKING_TERMS = "https://www.bengalrowingclub.com/index.php/members/booking_terms/sports"

export const PAYMENT_SUCCESS_URL = "https://brcdev.keylines.in/app-webview-payment/success.php"
export const PAYMENT_FAIL_URL = "https://brcdev.keylines.in/app-webview-payment/failure.php"