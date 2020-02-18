/*
 * @Author: your name
 * @Date: 2020-02-10 17:02:57
 * @LastEditTime : 2020-02-10 17:52:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/confirm/index.js
 */
import React, { memo, forwardRef, useImperativeHandle, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ConfirmWrapper } from './style';

const Confrim = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const { text, cancelBtnText, confirmBtnText } = props;

    const {handleConfirm} = props;

    useImperativeHandle(ref, () => ({
        show() {
            setShow(true);
        }
    }));
    return (
        <CSSTransition classNames="confirm-fade" timeout={300} appear={true} in={show}>
            <ConfirmWrapper style={{display: show ? "block": "none"}} onClick={e => e.stopPropagation()}>
                <div>
                    <div className="confirm_content">
                        <p className="text">{text}</p>
                        <div className="operate" >
                            <div className="operate_btn left" onClick={() => setShow(false)}>{cancelBtnText}</div>
                            <div className="operate_btn" onClick={() => { setShow(false); handleConfirm(); }}>{confirmBtnText}</div>
                        </div>
                    </div>
                </div>
            </ConfirmWrapper>
        </CSSTransition>
    )
})

export default memo(Confrim);
