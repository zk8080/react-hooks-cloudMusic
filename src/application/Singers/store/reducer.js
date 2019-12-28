/*
 * @Author: your name
 * @Date: 2019-12-28 20:11:16
 * @LastEditTime : 2019-12-28 20:21:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singers/store/reducer.js
 */
import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
    singerList: [],
    enterLoading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    pageCount: 0,
})

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_SINGER_LIST:
            return state.set('singerList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case actionTypes.CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case actionTypes.CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount', action.data);
        default:
            return state;
    }
}