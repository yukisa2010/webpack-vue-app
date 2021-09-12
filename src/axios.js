import baseAxios from 'axios'


export default baseAxios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "content-type": "application/json"
    }
})





