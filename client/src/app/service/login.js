import axios from 'axios'

const login = async loginInfo => {
    const request = axios.post('http://localhost:8080/login', loginInfo)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error logining to account', error)
        throw error
    })
}

const signup = async signupInfo => {
    const request = axios.post('http://localhost:8080/signup', signupInfo)
    return request.then(response => response.data)
    .catch(error => {
        console.log('error signing up', error)
        throw error
    })
}

export default {login, signup}