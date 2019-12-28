/*
 * @Author: your name
 * @Date: 2019-12-28 20:11:33
 * @LastEditTime : 2019-12-28 21:26:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singers/store/actionCreators.js
 */
import {
    getSingerListRequest,
    getHotSingerListRequest
} from '../../../api/request';
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeSingerList = (data) => ({
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
})

export const changePageCount = (data) => ({
    type: actionTypes.CHANGE_PAGE_COUNT,
    data: fromJS(data)
})

export const changePullUpLoading = (data) => ({
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = (data) => ({
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

// 第一次加载热门歌手
export const getHotSingerList = () => {
    return dispatch => {
        getHotSingerListRequest(0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(err => {
            console.log(err);
        })
    }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res => {
            const data  = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullDownLoading(false));
        }).catch(err => {
            console.log(err);
        })
    }
}

// 第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
    return dispatch => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(err => {
            console.log(err);
        })
    }
}

// 加载更多歌手列表
export const refreshMoreSingerList =  (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(category, alpha, pageCount).then(res => {
            const data  = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullDownLoading(false));
        }).catch(err => {
            console.log(err);
        })
    }
}
