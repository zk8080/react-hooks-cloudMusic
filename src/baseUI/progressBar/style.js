/*
 * @Author: your name
 * @Date: 2020-01-09 22:53:31
 * @LastEditTime: 2020-01-09 22:54:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/progressBar/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const ProgressBarWrapper = styled.div`
    height: 30px;
    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, .3);
        .progress {
            position: absolute;
            height: 100%;
            background: ${style["theme-color"]};
        }
        .progress-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid ${style["border-color"]};
                border-radius: 50%;
                background: ${style["theme-color"]};
            }
        }
    }
`
