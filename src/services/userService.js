import axios from '../axios'

const loginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword,
    })
}

const getAllUsersApi = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserApi = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserApi = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

export { loginApi, getAllUsersApi, createNewUserApi, deleteUserApi, editUserApi } 