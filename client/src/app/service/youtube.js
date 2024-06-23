import axios from 'axios'

const search = async searchQuery => {
    const request = axios.get(`http://localhost:8080/search?q=${searchQuery}`)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error logining to account', error)
        throw error
    })
}

export default { search }