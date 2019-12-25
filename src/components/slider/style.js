/*
 * @Author: your name
 * @Date: 2019-12-24 16:25:11
 * @LastEditTime : 2019-12-24 16:26:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/components/slider/style.js
 */
import styled from 'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: auto;
    background: white;
    .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${style["theme-color"]};
    }
    .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
    }
    .swiper-pagination-bullet-active {
        background: ${style["theme-color"]};
    }
    }
`;