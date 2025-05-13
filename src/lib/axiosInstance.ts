import axios from "axios";

export const apiMain = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
