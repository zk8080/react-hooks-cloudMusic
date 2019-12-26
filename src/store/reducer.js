/*
 * @Author: your name
 * @Date: 2019-12-24 16:11:26
 * @LastEditTime : 2019-12-26 20:52:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/store/reducer.js
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers({
    recommend: recommendReducer
})