/*
 * @Author: your name
 * @Date: 2019-12-25 11:11:29
 * @LastEditTime : 2019-12-31 16:17:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/scroll/style.js
 */
import styled from 'styled-components';

export const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const PullUpLoading = styled.div`
    position: absolute;
    left:0; 
    right:0;
    bottom: 5px;
    width: 60px;
    height: 60px;
    margin: auto;
    z-index: 100;
`;

export const PullDownLoading = styled.div`
    position: absolute;
    left:0; 
    right:0;
    top: 0px;
    height: 30px;
    margin: auto;
    z-index: 100;
`;
