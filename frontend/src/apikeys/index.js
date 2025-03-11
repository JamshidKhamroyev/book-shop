import axios from 'axios';

export const Myaxios = axios.create({
    baseURL: "https://book-shop-backend-2i9k.onrender.com",
    headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
    }
})
