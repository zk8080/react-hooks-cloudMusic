/*
 * @Author: your name
 * @Date: 2019-12-24 16:11:19
 * @LastEditTime : 2019-12-24 16:17:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/store/index.js
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;

