/*
 * @Author: your name
 * @Date: 2019-12-26 11:30:53
 * @LastEditTime : 2019-12-26 21:48:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/store/actionCreators.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners))
            dispatch(changeEnterLoading(false))
        }).catch(err => {
            console.log(err)
        })
    }
}

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result))
            dispatch(changeEnterLoading(false))
        }).catch(err => {
            console.log(err)
        })
    }
}
