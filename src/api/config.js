/*
 * @Author: your name
 * @Date: 2019-12-25 17:48:52
 * @LastEditTime : 2019-12-26 21:20:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/api/config.js
 */
import axios from 'axios';

export const baseUrl = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(res => {
    return res.data;
}, err => {
    console.log(err, '---er--')
})

export {
    axiosInstance
}