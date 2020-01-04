/*
 * @Author: your name
 * @Date: 2020-01-03 14:55:45
 * @LastEditTime : 2020-01-03 15:13:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/header/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const HeaderContainer = styled.div`
    position: fixed;
    padding: 5px 10px;
    padding-top: 0;
    height: 40px;
    width: 100%;
    z-index: 100;
    display: flex;
    line-height: 40px;
    color: ${style["font-color-light"]};
    .back {
        margin-right: 5px;
        font-size: 20px;
        width: 20px;
    }
    >h1 {
        font-size: ${style["font-size-l"]};
        font-weight: 700;
    }
`;
