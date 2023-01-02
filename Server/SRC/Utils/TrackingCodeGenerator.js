const TrackingCodeGenerator = (stringLength) => {
    const randomString = ''
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < stringLength; i++ ) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString
}

module.exports = {TrackingCodeGenerator}