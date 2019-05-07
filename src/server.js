import axios from 'axios';
import auth from './auth';

let headers = {};
if (auth.token) {
    headers = { 'Authorization': `Token ${auth.token}` }
}

const instance = axios.create({
    baseURL: 'https://avaliacaocif.herokuapp.com',
    timeout: 1000,
    headers: headers
});

export default instance;