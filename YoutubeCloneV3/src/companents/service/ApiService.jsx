import axios from "axios";
const options = {
    params: {
        maxResults: '100',
    },
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_SECRET_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    },
}
const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

export const APIService = {
    async fetching(url) {
        const res = await axios.get(`${BASE_URL}${url}`, options)
        return res.data;
    }
}