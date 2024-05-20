import axios from "axios"
import dotenv from 'dotenv'
import { response } from "express"

dotenv.config()

const searchVideos = searchQuery => {
    const request = axios.get('https://www.googleapis.com/youtube/v3/search',{
        params: {
            key: process.env.API_KEY,
            part: 'snippet',
            q: searchQuery,
            type: 'video',
            maxResults: 25
        }
    })
    return request.then(response => response.data)
        .catch(error => {
            console.error('Error adding to list:', error)
            throw error
        })
}

export default {searchVideos}