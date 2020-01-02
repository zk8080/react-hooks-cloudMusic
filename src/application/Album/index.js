/*
 * @Author: your name
 * @Date: 2020-01-02 21:58:17
 * @LastEditTime : 2020-01-02 22:14:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Album/index.js
 */
import React, { memo, useState } from 'react';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function Album(props) {

    const [ showStatus, setShowStatus ] = useState(true);

    return (
        <CSSTransition
            in={showStatus}  
            timeout={300} 
            classNames="fly" 
            appear={true} 
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
            </Container>
        </CSSTransition>
    )
}

export default memo(Album)
