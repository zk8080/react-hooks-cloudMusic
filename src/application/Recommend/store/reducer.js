/*
 * @Author: your name
 * @Date: 2019-12-26 11:33:50
 * @LastEditTime : 2019-12-26 21:47:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/store/reducer.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        default: 
            return state;
    }
}

