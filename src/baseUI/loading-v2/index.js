/*
 * @Author: your name
 * @Date: 2019-12-31 15:48:37
 * @LastEditTime : 2019-12-31 15:53:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/loading-v2/index.js
 */
import React, {memo} from 'react'
import { LoadingWraper }  from './style';

function LoadingV2(props) {
    return (
        <LoadingWraper>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <span>拼命加载中...</span>
        </LoadingWraper>
    )
}

export default memo(LoadingV2);

