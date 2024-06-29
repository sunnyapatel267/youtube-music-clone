import axios from 'axios'

const recognizeSong = async audio => {
    const request = axios.post(`http://localhost:8080/recognize`, audio)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error adding song', error)
        throw error
    })
}

export default { recognizeSong }