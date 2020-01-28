/*
 * @Author: your name
 * @Date: 2020-01-20 17:52:18
 * @LastEditTime : 2020-01-23 11:10:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/music-note/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container  =  styled.div`
    .icon_wrapper {
        position: fixed;
        z-index: 1000;
        margin-top: -10px;
        margin-left: -10px;
        color: ${style["theme-color"]};
        font-size: 14px;
        display: none;
        transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
        transform: translate3d(0, 0, 0);
        >div {
            transition: transform 1s;
        }
    }
`;
