import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const tokenInStorage = localStorage.getItem('auth_token');

if (typeof tokenInStorage === 'string') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenInStorage}`;
}

export const setToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axios;
