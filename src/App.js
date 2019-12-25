/*
 * @Author: your name
 * @Date: 2019-12-24 14:46:34
 * @LastEditTime : 2019-12-24 16:18:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/App.js
 */
import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import routes from './routes/index';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
        <HashRouter>
            <GlobalStyle></GlobalStyle>
            <IconStyle></IconStyle>
            {renderRoutes(routes)}
        </HashRouter>
    </Provider>
  );
}

export default App;
