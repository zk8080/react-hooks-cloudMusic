/*
 * @Author: your name
 * @Date: 2019-12-24 14:46:34
 * @LastEditTime: 2019-12-24 14:59:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
