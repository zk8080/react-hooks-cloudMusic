/*
 * @Author: your name
 * @Date: 2019-12-31 17:52:05
 * @LastEditTime : 2020-01-01 21:25:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Rank/store/actionCreators.js
 */
import { getRankListRequest } from '../../../api/request';
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeRankList = (data) => ({
    type: actionTypes.CHANGE_RANK_LIST,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getRankList = () => {
    return dispatch => {
        getRankListRequest()
            .then(res => {
                const {list} = res;
                dispatch(changeRankList(list));
                dispatch(changeEnterLoading(false));
            })
            .catch(e => {
                console.log(e)
            })
    }
}

