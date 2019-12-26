/*
 * @Author: your name
 * @Date: 2019-12-26 21:39:14
 * @LastEditTime : 2019-12-26 21:45:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/loading/index.js
 */
import React from 'react';
import { LoadingWrapper } from './style';

function Loading() {
    return (
        <LoadingWrapper>
            <div></div>
            <div></div>
        </LoadingWrapper>
    )
}

export default React.memo(Loading);
