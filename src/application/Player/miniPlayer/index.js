/*
 * @Author: your name
 * @Date: 2020-01-07 20:41:27
 * @LastEditTime : 2020-01-07 20:50:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/miniPlayer/index.js
 */
import React, { memo } from 'react';
import {getName} from '../../../api/utils';
import { MiniPlayerContainer } from './style';

function MiniPlayer(props) {

    const { song } = props;

    return (
        <MiniPlayerContainer>
            <div className="icon">
                <div className="imgWrapper">
                    <img className="play" src={song.al.picUrl} width="40" height="40" alt="img"/>
                </div>
            </div>
            <div className="text">
                <h2 className="name">{song.name}</h2>
                <p className="desc">{getName (song.ar)}</p>
            </div>
            <div className="control">
                <i className="iconfont">&#xe650;</i>
            </div>
            <div className="control">
                <i className="iconfont">&#xe640;</i>
            </div>
        </MiniPlayerContainer>
    )
}

export default memo(MiniPlayer)

