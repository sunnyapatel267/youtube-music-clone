import axios from 'axios'

const addSong = async data => {
    const request = axios.post(`http://localhost:8080/add/song`, data)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error adding song', error)
        throw error
    })
}

const getSongs = async (playlistId) => {
    const request = axios.get(`http://localhost:8080/retrieve/songs/${playlistId}`)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error adding song', error)
        throw error
    })
}

export default {addSong, getSongs}