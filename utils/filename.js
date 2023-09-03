const crypto = require('crypto');
const path = require('path');
function analyzeUploadFileName(originFileName, now) {
    function randomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        while (result.length < length) {
            const randomBytes = crypto.randomBytes(length);
            for (let i = 0; i < randomBytes.length && result.length < length; i++) {
                const randomIndex = randomBytes[i] % characters.length;
                result += characters.charAt(randomIndex);
            }
        }

        return result;
    }

    const pathParse = path.parse(originFileName)
    const fileName = pathParse.name;
    const fileExtension = pathParse.ext;
    return `${fileName}_${now.toFormat('yyyyMMdd')}_${randomString(6)}${fileExtension}`;
}

module.exports = {
    analyzeUploadFileName
};