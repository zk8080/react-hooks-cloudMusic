/*
 * @Author: your name
 * @Date: 2019-12-24 15:14:36
 * @LastEditTime : 2020-01-02 22:09:45
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
import Album from  '../application/Album';

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
                component: Recommend,
                routes: [
                    {
                        path: '/recommend/:id',
                        component: Album
                    }
                ]
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



