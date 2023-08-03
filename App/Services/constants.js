import { Dimensions, Platform } from "react-native"


export const BASE_URL = "https://bengalrowingclub.keylines.in/index.php/api/"
export const KEY = "c99b9114090f82bc81ae8cff319085ae"
export const SOURCE = Platform.OS.toUpperCase()

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const TABLEBOOKING_TERMS = "https://bengalrowingclub.keylines.in/index.php/members/booking_terms/table"