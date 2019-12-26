/*
 * @Author: your name
 * @Date: 2019-12-25 18:05:18
 * @LastEditTime : 2019-12-25 18:06:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/api/request.js
 */
import { axiosInstance } from './config';

export const getBannerRequest = () => {
    return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
    return axiosInstance.get ('/personalized');
}
  
