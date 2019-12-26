/*
 * @Author: your name
 * @Date: 2019-12-26 11:33:50
 * @LastEditTime : 2019-12-26 11:49:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/store/reducer.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    bannerList: [],
    recommendList: []
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        default: 
            return state;
    }
}

