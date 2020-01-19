/*
 * @Author: your name
 * @Date: 2020-01-09 22:52:08
 * @LastEditTime : 2020-01-19 10:52:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/progressBar/index.js
 */
import React, { memo, useRef, useState, useEffect } from 'react';
import { ProgressBarWrapper } from './style';

function ProgressBar(props) {

    const { percent } = props;

    const { percentChange } = props;

    const progressRef = useRef(); // 已完成的滚动条
    const progressBarRef = useRef(); // 总的滚动条
    const progressBtnRef = useRef(); // 滚动条按钮

    const  [touch, setTouch] = useState({});

    const progressBtnWidth = 16;  

    useEffect(() => {
        if(percent >= 0 && percent <= 1 && !touch.initiated) {
          const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
          const offsetWidth = percent * barWidth;
          progressRef.current.style.width = `${offsetWidth}px`;
          progressBtnRef.current.style["transform"] = `translate3d(${offsetWidth}px, 0, 0)`;
        }
        // eslint-disable-next-line
    }, [percent]);

    // 执行父组件的回调函数 将改变的新的进度传递给父组件
    const _changePercent = () => {
        const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
        const curPercent = progressRef.current.clientWidth/barWidth;// 新的进度计算
        percentChange(curPercent);// 把新的进度传给回调函数并执行
    }

    // 处理进度条的偏移
    const _offset = (offsetWidth) => {
        progressRef.current.style.width = `${offsetWidth}px`;
        progressBtnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    // 开始滑动
    const progressTouchStart = (e) => {
        const startTouch = {};
        //initial 为 true 表示滑动动作开始了
        startTouch.initiated = true;
        // 滑动开始的横向坐标
        startTouch.startX = e.touches[0].pageX;
        // 当前progress的长度
        startTouch.left = progressRef.current.clientWidth;
        setTouch(startTouch);
    }

    // 滑动
    const progressTouchMove = (e) => {
        if(!touch.initiated){
            // 如果没有进行滑动 则不做操作
            return;
        }
        // 滑动距离   
        const deltaX = e.touches[0].pageX - touch.startX;
        // 进度条总长度
        const barWidth = progressBarRef.current.clientWidth - progressBtnWidth; 
        // 先取滑动的距离最大值，最小为0， 防止往左滑动， 然后再取整个进度条的最小值，防止超出进度条总长度
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
        _offset(offsetWidth);
    }   
    // 滑动结束
    const progressTouchEnd = () => {
        const endTouch = JSON.parse(JSON.stringify(touch));
        endTouch.initiated = false;
        setTouch(endTouch);
        _changePercent();
    }

    // 点击滚动条
    const progressClick = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        // 进度条总长度
        const barWidth = progressBarRef.current.clientWidth - progressBtnWidth; 
        // 先取滑动的距离最大值，最小为0， 防止往左滑动， 然后再取整个进度条的最小值，防止超出进度条总长度
        const offsetWidth = Math.min(Math.max(0, e.pageX - rect.left), barWidth);
        _offset(offsetWidth);
        _changePercent();
    }

    return (
        <ProgressBarWrapper>
            <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
                <div className="progress" ref={progressRef}></div>
                <div className="progress-btn-wrapper" 
                    ref={progressBtnRef}
                    onTouchStart={progressTouchStart}
                    onTouchMove={progressTouchMove}
                    onTouchEnd={progressTouchEnd}
                >
                    <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    )
}

export default memo(ProgressBar)