
export function getDateToString(date: Date): string {
    const validDate = new Date(date);
    const day = validDate.getDate();
    const month = validDate.getMonth() + 1;
    const year = validDate.getFullYear();
    return `${day<10 ? `0${day}` : day}-${month<10 ? `0${month}` : month}-${year}`;
}


export function getDateForDatePickerValue(date: Date): string {
    const validDate = new Date(date);
    const day = validDate.getDate();
    const month = validDate.getMonth() + 1;
    const year = validDate.getFullYear();
    return `${year}-${month<10 ? `0${month}` : month}-${day<10 ? `0${day}` : day}`;
}