import axios from 'axios';

export const Myaxios = axios.create({
    baseURL: "http://localhost:2008",
    headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
    }
})
