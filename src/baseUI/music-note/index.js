/*
 * @Author: your name
 * @Date: 2020-01-20 17:52:14
 * @LastEditTime : 2020-01-23 11:35:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/music-note/index.js
 */
import React, { memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { Container } from './style';

const MusicNote = forwardRef((props, ref) => {
    const iconRef = useRef();
    // 容器中的音符数量
    const ICON_NUMBER = 3;

    const createNode = (txt) => {
        const template = `<div class='icon_wrapper'>${txt}</div>`;
        let tempNode = document.createElement('div');
        tempNode.innerHTML = template;
        return tempNode.firstChild;
    }

    useEffect(() => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            let node = createNode(`<div class="iconfont">&#xe642;</div>`);
            iconRef.current.appendChild(node);
        }
        // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
        let domArray = [].slice.call(iconRef.current.children);
        domArray.forEach(item => {
            console.log(item, '---item=---')
            item.running = false;
            item.addEventListener('transitionend', function () {
                console.log(this, '---this--')
                this.style['display'] = 'none';
                this.style["transform"] = `translate3d(0, 0, 0)`;
                this.running = false;

                let icon = this.querySelector('div');
                icon.style["transform"] = `translate3d(0, 0, 0)`;
            }, false);
        });
    }, [])

    const startAnimation = ({ x, y }) => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            let domArray = [].slice.call(iconRef.current.children)
            let item = domArray[i]
            // 选择一个空闲的元素来开始动画
            if (item.running === false) {
                item.style.left = x + "px";
                item.style.top = y + "px";
                item.style.display = "inline-block";

                setTimeout(() => {
                    item.running = true;
                    item.style["transform"] = `translate3d(0, 750px, 0)`;
                    let icon = item.querySelector("div");
                    icon.style["transform"] = `translate3d(-40px, 0, 0)`;
                }, 20);
                break;
            }
        }
    };
    // 外界调用的 ref 方法
    useImperativeHandle(ref, () => ({
        startAnimation
    }));

    return (
        <Container ref={iconRef}></Container>
    )
})

export default memo(MusicNote);