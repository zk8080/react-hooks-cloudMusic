/*
 * @Author: your name
 * @Date: 2019-12-27 14:59:35
 * @LastEditTime : 2019-12-27 15:09:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/horizen-item/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const List = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type {
        display: block;
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
        font-size: ${style["font-size-m"]};
    }
`;

export const ListItem = styled.span`
    flex: 0 0 auto;
    font-size: ${style["font-size-m"]};
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
        color: ${style["theme-color"]};
        border: 1px solid ${style["theme-color"]};
        opacity: 0.8;
    }
`;
