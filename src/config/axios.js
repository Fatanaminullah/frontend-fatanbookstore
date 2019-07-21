import axios from 'axios'

export default axios.create({
    baseURL: 'https://fatanbookstore-api.herokuapp.com'
})