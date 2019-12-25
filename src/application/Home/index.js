/*
 * @Author: your name
 * @Date: 2019-12-24 15:16:00
 * @LastEditTime : 2019-12-24 17:48:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Home/index.js
 */
import React, {Fragment, memo} from 'react';
import { renderRoutes } from 'react-router-config';
import { Top, Tab, TabItem } from './style';
import { NavLink } from 'react-router-dom';

function Home(props) {

    const {route} = props;

    return (
        <Fragment>
            <Top>
                <span className='iconfont menu'>&#xe65c;</span>
                <span className='title'>WebApp</span>
                <span className='iconfont search'>&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink
                    to='/recommend'
                    activeClassName='selected'
                >
                    <TabItem>
                        <span> 推荐 </span>
                    </TabItem>
                </NavLink>
                <NavLink
                    to='/singers'
                    activeClassName='selected'
                >
                    <TabItem>
                        <span> 歌手 </span>
                    </TabItem>
                </NavLink>
                <NavLink
                    to='/rank'
                    activeClassName='selected'
                >
                    <TabItem>
                        <span> 排行榜 </span>
                    </TabItem>
                </NavLink>
            </Tab>
            {
                renderRoutes(route.routes)
            }
        </Fragment>
    )
}

export default memo(Home);

