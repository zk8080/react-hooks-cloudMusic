/*
 * @Author: your name
 * @Date: 2020-02-03 11:07:40
 * @LastEditTime : 2020-02-06 10:41:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/playList/index.js
 */
import React, { memo } from 'react';
import { PlayListWrapper, ScrollWrapper } from './style';
import { connect } from 'react-redux';
import { changeShowPlayList } from '../store/actionCreators';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

function PlayList(props) {
    const { showPlayList } = props;
    console.log( showPlayList, '--showPlayList--' )
    
    const { togglePlayListDispatch } = props;

    const playListRef = useRef();
    const listWrapperRef = useRef();
    const [ isShow, setIsShow ] = useState(false);

    const onEnterCB = useCallback(() => {
        // 让列表显示
        setIsShow(true);
        // 最开始隐藏在下面
        listWrapperRef.current.style["transform"] = `translate3d(0, 100%, 0)`;
    }, []);

    const onEnteringCB = useCallback(() => {
        // 让列表展现
        listWrapperRef.current.style["transition"] = "all 0.3s";
        listWrapperRef.current.style["transform"] = `translate3d(0, 0, 0)`;
    }, []);

    const onExitingCB = useCallback(() => {
        // 先隐藏列表
        listWrapperRef.current.style["transition"] = "all 0.3s";
        listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
    }, []);

    const onExitedCB = useCallback(() => {
        setIsShow (false);
        listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
    }, [])

    return (
        <CSSTransition
            in={showPlayList}
            timeout={300} 
            classNames="list-fade"
            onEnter={onEnterCB}
            onEntering={onEnteringCB}
            onExiting={onExitingCB}
            onExited={onExitedCB}
        >
            <PlayListWrapper 
                ref={playListRef} 
                style={isShow === true ? { display: "block" } : { display: "none" }}
                onClick={() => togglePlayListDispatch(false)}
            >
                <div className="list_wrapper" ref={listWrapperRef}>
                    <ScrollWrapper></ScrollWrapper>
                </div>
            </PlayListWrapper>
        </CSSTransition>
        
    )
}

const mapStateToProps = (state) => ({
    showPlayList: state.getIn(['player', 'showPlayList']),
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayListDispatch (data) {
            dispatch(changeShowPlayList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PlayList));