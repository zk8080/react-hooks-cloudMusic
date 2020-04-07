/*
 * @Author: your name
 * @Date: 2020-04-03 10:58:26
 * @LastEditTime: 2020-04-03 11:00:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/search-box/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    padding-right: 20px;
    height: 40px;
    background: ${style["theme-color"]};
    .icon-back{
        font-size: 24px;
        color: ${style["font-color-light"]};
    }
    .box{
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: ${style["theme-color"]};
        color: ${style["highlight-background-color"]};
        font-size: ${style["font-size-m"]};
        outline: none;
        border: none;
        border-bottom: 1px solid ${style["border-color"]};
        &::placeholder{
        color: ${style["font-color-light"]};
        }
    }
    .icon-delete{
        font-size: 16px;
        color: ${style["background-color"]};
    }
`;
