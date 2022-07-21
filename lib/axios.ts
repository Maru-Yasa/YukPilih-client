import axios from "axios";
import { getCookie } from "cookies-next";

axios.defaults.baseURL = 'http://0.0.0.0:8000/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('authToken')}`

// const myAxios = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     headers: {
//         Authorization: `Bearer ${getCookie('authToken')}`
//     }
// })

export default axios