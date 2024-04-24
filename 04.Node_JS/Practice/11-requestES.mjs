//암호화
function encrypt(data) {
    return 'encrypted data';
}

//요청 -> 암호화

//요청
function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`${encryptedData} is being sent to ${url}`);
}

export { send };
