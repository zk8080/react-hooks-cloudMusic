/*
 * @Author: your name
 * @Date: 2019-12-25 18:05:18
 * @LastEditTime : 2020-01-04 16:10:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/api/request.js
 */
import { axiosInstance } from './config';

export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
    return axiosInstance.get(`/toplist/detail`);
}

export const getAlbumDetailRequest = id => {
    return axiosInstance.get (`/playlist/detail?id=${id}`);
};
