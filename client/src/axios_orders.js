import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-593d4.firebaseio.com/'
})

export default instance