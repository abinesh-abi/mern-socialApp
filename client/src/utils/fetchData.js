import config from './config';
import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(config.SERVER_URL+url, {
        headers: { Authorization: token},
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(config.SERVER_URL+url, post, {
        headers: { Authorization: token},
            withCredentials: true,
             credentials: 'include'
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(config.SERVER_URL+url, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(config.SERVER_URL+url, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(config.SERVER_URL+url, {
        headers: { Authorization: token}
    })
    return res;
}