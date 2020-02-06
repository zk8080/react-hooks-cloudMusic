/*
 * @Author: your name
 * @Date: 2020-02-03 11:07:40
 * @LastEditTime : 2020-02-06 12:03:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/playList/index.js
 */
import React, { memo, useRef, useState, useCallback } from 'react';
import { PlayListWrapper, ScrollWrapper, ListContent, ListHeader } from './style';
import { connect } from 'react-redux';
import { changeShowPlayList, changeCurrentIndex, changePlayMode, changePlayList, deleteSong } from '../store/actionCreators';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../../baseUI/scroll';
import { playMode } from "../../../api/config";
import { getName, shuffle, findIndex } from './../../../api/utils';

function PlayList(props) {
    const {
        showPlayList,
        currentIndex,
        playList: immutablePlayList,
        currentSong: immutableCurrentSong,
        mode,
        sequencePlayList: immutableSequencePlayList
    } = props;

    const {
        togglePlayListDispatch,
        changeCurrentIndexDispatch,
        changeModeDispatch,
        changePlayListDispatch,
        deleteSongDispatch
    } = props;

    const playList = immutablePlayList.toJS();
    const currentSong = immutableCurrentSong.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();

    const playListRef = useRef();
    const listWrapperRef = useRef();
    const [isShow, setIsShow] = useState(false);

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
        setIsShow(false);
        listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
    }, [])

    // 渲染当前播放icon
    const getCurrentIcon = (item) => {
        // 是不是当前正在播放的歌曲
        const current = currentSong.id === item.id;
        const className = current ? 'icon-play' : '';
        const content = current ? '&#xe6e3;' : '';
        return (
            <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>
        )
    };
    // 渲染当前播放模式
    const getPlayMode = () => {
        let content, text;
        if (mode === playMode.sequence) {
            content = "&#xe625;";
            text = "顺序播放";
        } else if (mode === playMode.loop) {
            content = "&#xe653;";
            text = "单曲循环";
        } else {
            content = "&#xe61b;";
            text = "随机播放";
        }
        return (
            <div>
                <i className="iconfont" onClick={(e) => changeMode(e)} dangerouslySetInnerHTML={{ __html: content }}></i>
                <span className="text" onClick={(e) => changeMode(e)}>{text}</span>
            </div>
        )
    };
    const changeMode = (e) => {
        let newMode = (mode + 1) % 3;
        // 具体逻辑比较复杂 后面来实现
    };

    // 切歌
    const handleCurrentIndex = (index) => {
        if(index === currentIndex) return;
        changeCurrentIndexDispatch(index)
    }

    // 删除一首歌
    const handleDeleteSong = (e, song) => {
        e.stopPropagation();
        deleteSongDispatch(song)
    }

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
                <div 
                    className="list_wrapper" 
                    ref={listWrapperRef}
                    onClick={ e => e.stopPropagation() }
                >
                    <ListHeader>
                        <h1 className="title">
                            {getPlayMode()}
                            <span className="iconfont clear">&#xe63d;</span>
                        </h1>
                    </ListHeader>
                    <ScrollWrapper>
                        <Scroll
                        // ref={listContentRef}
                        // onScroll={pos => handleScroll(pos)}
                        // bounceTop={false}
                        >
                            <ListContent>
                                {
                                    playList.map((item, index) => {
                                        return (
                                            <li className="item" key={item.id} onClick={ () => handleCurrentIndex(index) }>
                                                {getCurrentIcon(item)}
                                                <span className="text">{item.name} - {getName(item.ar)}</span>
                                                <span className="like">
                                                    <i className="iconfont">&#xe601;</i>
                                                </span>
                                                <span className="delete" onClick={ e => handleDeleteSong(e, item) }>
                                                    <i className="iconfont">&#xe63d;</i>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ListContent>
                        </Scroll>
                    </ScrollWrapper>
                    {/* <Confirm
                        ref={confirmRef}
                        text={"是否删除全部?"}
                        cancelBtnText={"取消"}
                        confirmBtnText={"确定"}
                        handleConfirm={handleConfirmClear}
                    /> */}
                </div>
            </PlayListWrapper>
        </CSSTransition>

    )
}

const mapStateToProps = (state) => ({
    currentIndex: state.getIn(['player', 'currentIndex']),
    currentSong: state.getIn(['player', 'currentSong']),
    playList: state.getIn(['player', 'playList']),//播放列表
    sequencePlayList: state.getIn(['player', 'sequencePlayList']),//顺序排列时的播放列表
    showPlayList: state.getIn(['player', 'showPlayList']),
    mode: state.getIn(['player', 'mode'])
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data));
        },
        //修改当前歌曲在列表中的index，也就是切歌
        changeCurrentIndexDispatch(data) {
            dispatch(changeCurrentIndex(data));
        },
        //修改当前的播放模式
        changeModeDispatch(data) {
            dispatch(changePlayMode(data));
        },
        //修改当前的歌曲列表
        changePlayListDispatch(data) {
            dispatch(changePlayList(data));
        },
        deleteSongDispatch(data) {
            dispatch(deleteSong(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PlayList));