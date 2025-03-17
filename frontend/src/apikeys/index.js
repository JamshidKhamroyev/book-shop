import axios from 'axios';

export const Myaxios = axios.create({
    baseURL: "https://book-shop-backend-2i9k.onrender.com",
    headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
    }
})
