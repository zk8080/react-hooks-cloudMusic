/*
 * @Author: your name
 * @Date: 2019-12-31 17:51:57
 * @LastEditTime : 2020-01-01 21:06:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Rank/store/reducer.js
 */
import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
    rankList: [],
    enterLoading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        default:
            return state;
    }
}
