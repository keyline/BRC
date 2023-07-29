import moment from "moment";

export const onISOString = (value) => {
    const dateString = value;
    const dateParts = dateString.split(" ");
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const month = monthNames.indexOf(dateParts[0]);
    const day = parseInt(dateParts[1].replace(",", ""), 10);
    const year = parseInt(dateParts[2], 10);

    const dateObject = new Date(Date.UTC(year, month, day));
    // const dateObject = moment(dateString, "MMM DD, YYYY");
    const isoString = dateObject.toISOString();
    return isoString;
}

export const dateConvert = (value) => {
    if (value) {
        return moment(new Date(value)).format("MMM DD, YYYY")
    } else {
        return null
    }
}

export const dateConvertNew = (value) => {
    if (value) {
        return moment(new Date(value)).format("DD-MM-YYYY")
    } else {
        return null
    }
}