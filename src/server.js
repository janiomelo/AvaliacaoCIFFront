import axios from 'axios';
import auth from './auth';

let headers = {};
if (auth.token) {
    headers = { 'Authorization': `Token ${auth.token}` }
}

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
    headers: headers
});

export default instance;