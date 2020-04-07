/*
 * @Author: your name
 * @Date: 2020-04-03 11:23:45
 * @LastEditTime: 2020-04-03 11:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Search/store/actionCreators.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getHotKeyWordsRequest, getResultSongsListRequest, getSuggestListRequest } from '../../../api/request';

// 修改热门关键字
const changeHotKeyWords = (data) => ({
    type: actionTypes.SET_HOT_KEYWRODS,
    data: fromJS(data)
})

const changeSuggestList = (data) => ({
    type: actionTypes.SET_SUGGEST_LIST,
    data: fromJS(data)
});

const changeResultSongs = (data) => ({
    type: actionTypes.SET_SONGS_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
    type: actionTypes.SET_ENTER_LOADING,
    data
});

export const getHotKeyWords = () => {
    return dispatch => {
        getHotKeyWordsRequest()
            .then(data => {
                let list = data.result.hots || [];
                dispatch(changeHotKeyWords(list));
                dispatch(changeEnterLoading(false));// 关闭 loading
            })
    }
}

export const getSuggestList = (query) => {
    return dispatch => {
        getSuggestListRequest(query)
            .then(data => {
                if (!data) return
                let res = data.result || [];
                dispatch(changeSuggestList(res));
                dispatch(changeEnterLoading(false));// 关闭 loading
            })
        getResultSongsListRequest(query)
            .then(data => {
                if (!data) return;
                let res = data.result.songs || [];
                dispatch(changeResultSongs(res));
                dispatch(changeEnterLoading(false));// 关闭 loading
            })
    }
}