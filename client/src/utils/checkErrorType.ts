export function checkErrorType(data: any): boolean {
    if('error_message' in data)
        return true;

    return false;
}