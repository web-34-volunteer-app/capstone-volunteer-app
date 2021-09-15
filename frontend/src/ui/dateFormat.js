const dateLength = 10;
const timeStart = 11;
const timeLength = timeStart + 5;

export function dateTimeToDate(dateTime) {
    let date = "";
    for(let i = 0; i < dateLength; i++){
        date += dateTime[i];
    }
    return date;
}

export function dateTimeToTime(dateTime) {
    let time = "";
    for(let i = timeStart; i < timeLength; i++) {
        time += dateTime[i];
    }
    return time;
}