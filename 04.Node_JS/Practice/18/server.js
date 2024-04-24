import axios from 'axios';

async function request() {
    try {
        const response = await axios.get('https://naver.com');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

request();
