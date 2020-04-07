/*
 * @Author: your name
 * @Date: 2019-12-24 16:11:26
 * @LastEditTime: 2020-04-03 11:44:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/store/reducer.js
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as albumReducer } from '../application/Album/store/index';
import { reducer as singerInfoReducer } from '../application/Singer/store/index';
import { reducer as playerReducer } from '../application/Player/store/index';
import { reducer as searchReducer } from '../application/Search/store/index';

export default combineReducers({
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer,
    album: albumReducer,
    singerInfo: singerInfoReducer,
    player: playerReducer,
    search: searchReducer
})
