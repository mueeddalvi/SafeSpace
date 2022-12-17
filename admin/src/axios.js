import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://societyapp-1bc9d.firebaseio.com/',
})

export default instance;