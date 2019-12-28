/*
 * @Author: your name
 * @Date: 2019-12-24 16:11:26
 * @LastEditTime : 2019-12-28 21:29:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/store/reducer.js
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from '../application/Singers/store/index';

export default combineReducers({
    recommend: recommendReducer,
    singers: singerReducer
})
