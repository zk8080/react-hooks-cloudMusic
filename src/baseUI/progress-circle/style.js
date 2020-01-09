/*
 * @Author: your name
 * @Date: 2020-01-09 21:50:23
 * @LastEditTime : 2020-01-09 21:53:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/progress-circle/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const CircleWrapper = styled.div`
    position: relative;
    circle {
        stroke-width: 8px;
        transform-origin: center;
        &.progress-background {
            transform: scale(0.9);
            stroke: ${style["theme-color-shadow"]};
        }
        &.progress-bar {
            transform: scale(0.9) rotate(-90deg);
            stroke: ${style["theme-color"]};
        }
    }
`;
