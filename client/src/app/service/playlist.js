import axios from 'axios'

const getUserPlaylists = async username => {
    const request = axios.post('http://localhost:8080/retrieve/playlists', username)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error getting user playlists', error)
        throw error
    })
}

const addUserPlaylist = async data => {
    const request = axios.post('http://localhost:8080/create/playlist', data)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error getting user playlists', error)
        throw error
    })
}

export default {getUserPlaylists, addUserPlaylist}