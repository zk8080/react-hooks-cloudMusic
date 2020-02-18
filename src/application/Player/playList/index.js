/*
 * @Author: your name
 * @Date: 2020-02-03 11:07:40
 * @LastEditTime: 2020-02-18 18:46:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/playList/index.js
 */
import React, { memo, useRef, useState, useCallback } from 'react';
import { PlayListWrapper, ScrollWrapper, ListContent, ListHeader } from './style';
import { connect } from 'react-redux';
import {
    changeShowPlayList,
    changeCurrentIndex,
    changePlayMode,
    changePlayList,
    deleteSong,
    changeSequecePlayList,
    changePlayingState,
    changeCurrentSong
} from '../store/actionCreators';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../../baseUI/scroll';
import { playMode } from "../../../api/config";
import { getName, shuffle, findIndex } from './../../../api/utils';
import Confirm from '../../../baseUI/confirm';

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
        deleteSongDispatch,
        clearDispatch
    } = props;

    const playList = immutablePlayList.toJS();
    const currentSong = immutableCurrentSong.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();

    const playListRef = useRef();
    const listWrapperRef = useRef();
    const confirmRef = useRef();
    const listContentRef = useRef();

    // 列表显示标识
    const [isShow, setIsShow] = useState(false);

    // 是否允许滑动事件生效
    const [canTouch, setCanTouch] = useState(true);
    // touchStart后记录y值
    const [startY, setStartY] = useState(0);
    // touchStart事件是否已经被触发
    const [initialed, setInitialed] = useState(0);
    // 用户下滑的距离
    const [distance, setDistance] = useState(0);

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
    // 改变播放模式
    const changeMode = (e) => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
            //顺序模式
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList);
            changeCurrentIndexDispatch(index);
        } else if (newMode === 1) {
            //单曲循环
            // changePlayListDispatch(sequencePlayList);
            changePlayListDispatch([currentSong]);
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
        }
        changeModeDispatch(newMode);
    };

    // 切歌
    const handleCurrentIndex = (index) => {
        if (index === currentIndex) return;
        changeCurrentIndexDispatch(index)
    }

    // 删除一首歌
    const handleDeleteSong = (e, song) => {
        e.stopPropagation();
        deleteSongDispatch(song)
    }

    // 点击删除全部图标
    const handleShowClear = () => {
        confirmRef.current.show();
    }

    // 删除全部歌曲
    const handleConfirmClear = () => {
        clearDispatch()
    }


    const handleTouchStart = (e) => {
        if (!canTouch || initialed) return;
        listWrapperRef.current.style["transition"] = "";
        setStartY(e.nativeEvent.touches[0].pageY);//记录y值
        setInitialed(true);
    };

    const handleTouchMove = (e) => {
        if (!canTouch || !initialed) return;
        let distance = e.nativeEvent.touches[0].pageY - startY;
        if (distance < 0) return;
        setDistance(distance);//记录下滑距离
        listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
    };

    const handleTouchEnd = (e) => {
        setInitialed(false);
        //这里设置阈值为150px
        if (distance >= 150) {
            //大于150px则关闭PlayList
            togglePlayListDispatch(false);
        } else {
            //否则反弹回去
            listWrapperRef.current.style["transition"] = "all 0.3s";
            listWrapperRef.current.style["transform"] = `translate3d(0px, 0px, 0px)`;
        }
    };


    const handleScroll = (pos) => {
        // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
        let state = pos.y === 0;
        setCanTouch(state);
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
                    onClick={e => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <ListHeader>
                        <h1 className="title">
                            {getPlayMode()}
                            <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
                        </h1>
                    </ListHeader>
                    <ScrollWrapper>
                        <Scroll
                            ref={listContentRef}
                            onScroll={pos => handleScroll(pos)}
                            bounceTop={false}
                        >
                            <ListContent>
                                {
                                    playList.map((item, index) => {
                                        return (
                                            <li className="item" key={item.id} onClick={() => handleCurrentIndex(index)}>
                                                {getCurrentIcon(item)}
                                                <span className="text">{item.name} - {getName(item.ar)}</span>
                                                <span className="like">
                                                    <i className="iconfont">&#xe601;</i>
                                                </span>
                                                <span className="delete" onClick={e => handleDeleteSong(e, item)}>
                                                    <i className="iconfont">&#xe63d;</i>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ListContent>
                        </Scroll>
                    </ScrollWrapper>
                    <Confirm
                        ref={confirmRef}
                        text={"是否删除全部?"}
                        cancelBtnText={"取消"}
                        confirmBtnText={"确定"}
                        handleConfirm={handleConfirmClear}
                    />
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
        clearDispatch() {
            // 1. 清空两个列表
            dispatch(changePlayList([]));
            dispatch(changeSequecePlayList([]));
            // 2. 初始 currentIndex
            dispatch(changeCurrentIndex(-1));
            // 3. 关闭 PlayList 的显示
            dispatch(changeShowPlayList(false));
            // 4. 将当前歌曲置空
            dispatch(changeCurrentSong({}));
            // 5. 重置播放状态
            dispatch(changePlayingState(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(PlayList));