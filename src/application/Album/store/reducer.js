/*
 * @Author: your name
 * @Date: 2020-01-04 16:07:56
 * @LastEditTime : 2020-01-04 17:55:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Album/store/reducer.js
 */
import * as actionTypes from './constants';
import { fromJS } from "immutable";

const defaultState = fromJS({
    currentAlbum: {},
    enterLoading: false,
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', action.data)
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        default:
            return state
    }
}
