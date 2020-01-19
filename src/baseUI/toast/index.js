/*
 * @Author: your name
 * @Date: 2020-01-19 15:46:52
 * @LastEditTime : 2020-01-19 16:07:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/toast/index.js
 */
import React, { memo, forwardRef, useState, useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';
import {ToastWrapper} from './style';

const Toast = forwardRef((props, ref) => {
    const {text} = props;
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState('')

    // 给ref挂载方法
    useImperativeHandle(ref, () => ({
        show() {
            // 做了防抖处理
            if(timer) clearTimeout(timer);
            setShow(true);
            setTimer(setTimeout(() => {
                setShow(false)
            }, 3000));
        }
    }))

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="drop" 
            unmountOnExit
        >
            <ToastWrapper>
                <div className="text">{text}</div>
            </ToastWrapper>
        </CSSTransition>
    )
})


export default memo(Toast);