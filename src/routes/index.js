/*
 * @Author: your name
 * @Date: 2019-12-24 15:14:36
 * @LastEditTime : 2019-12-24 15:29:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/routes/index.js
 */
import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (<Redirect to={'/recommend'}/>)
            },
            {
                path: '/recommend',
                component: Recommend
            },
            {
                path: '/rank',
                component: Rank
            },
            {
                path: '/singers',
                component: Singers
            },
        ]
    }
]



