/*
 * @Author: your name
 * @Date: 2020-01-07 20:15:46
 * @LastEditTime : 2020-01-28 16:48:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/index.js
 */
import React, { memo, Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import Toast from '../../baseUI/toast/index';
import { getSongUrl, isEmptyObject, findIndex, shuffle } from '../../api/utils';
import { playMode } from '../../api/config';

function Player(props) {

    const { fullScreen,
        playing,
        currentIndex,
        currentSong: immutableCurrentSong,
        mode,
        sequencePlayList: immutableSequencePlayList,//顺序列表
        playList: immutablePlayList, // 播放列表
    } = props;

    const { toggleFullScreenDispatch,
        togglePlayingDispatch,
        changeCurrentIndexDispatch,
        changeCurrentDispatch,
        changePlayListDispatch,
        changeModeDispatch
    } = props;

    
    const currentSong = immutableCurrentSong.toJS();
    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();

    const audioRef = useRef();
    const toastRef = useRef();

    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0);
    // 歌曲总时长
    const [duration, setDuration] = useState(0);
    //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
    const [preSong, setPreSong] = useState({});

    // 切换模式提示信息
    const [ modeText, setModeText ] = useState('');

    // 歌曲缓存是否完成标识
    const [songReady, setSongReady] = useState(true);

    // 播放进度
    const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [playing]);

    useEffect(() => {
        // 当播放列表和播放歌曲下标改变时 进行处理
        // 如果没有列表或者当前歌曲和上次歌曲一样，则不进行播放
        // 如果没有缓存完成也不进行播放
        if (!playList.length
            || currentIndex === -1
            || !playList[currentIndex]
            || preSong.id === playList[currentIndex].id
            || !songReady
            ) {
            return;
        }
        // 获取当前歌曲
        let curSong = playList[currentIndex];
        setPreSong(curSong);
        setSongReady(false); // 将缓存标识设置为false,表示没有缓存成功
        changeCurrentDispatch(curSong);
        audioRef.current.src = getSongUrl(curSong.id);
        setTimeout(() => {
            audioRef.current.play().then(res => {
                // 歌曲开始播放后将标识设置为true
                setSongReady(true);
            });
        })
        togglePlayingDispatch(true);
        setCurrentTime(0);//从头开始播放
        setDuration((curSong.dt / 1000) | 0);//时长
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playList, currentIndex])

    // 修改播放状态
    const clickPlaying = (e, flag) => {
        e.stopPropagation();
        togglePlayingDispatch(flag);
    }

    // 更新播放时间
    const updateTime = (e) => {
        setCurrentTime(e.target.currentTime)
    }

    // 改变进度
    const onProgressChange = curPercent => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
            togglePlayingDispatch(true);
        }
    };

    // 单曲循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        togglePlayingDispatch(true);
        audioRef.current.play();
    }

    // 上一曲
    const handlePrev = () => {
        // 只有一首歌时  进行单曲循环的操作
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        // 获取上一首歌的下标
        let index = currentIndex - 1;
        // 如果index < 0，则表示当前歌曲为第一首 则播放最后一首
        if (index < 0) {
            index = playList.length - 1;
        }
        if (!playing) {
            togglePlayingDispatch(true);
        }
        changeCurrentIndexDispatch(index);
    }

    // 下一曲
    const handleNext = () => {
        // 只有一首歌时  进行单曲循环的操作
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        // 获取下一首歌的下标
        let index = currentIndex + 1;
        // 如果index 等于playList的长度，则表示当前歌曲为最后一首 则播放第一首
        if (index === playList.length) {
            index = 0;
        }
        if (!playing) {
            togglePlayingDispatch(true);
        }
        changeCurrentIndexDispatch(index);
    }

    // 切换模式
    const changeMode = () => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
            //顺序模式
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList);
            changeCurrentIndexDispatch(index);
            setModeText('顺序循环')
        } else if (newMode === 1) {
            //单曲循环
            // changePlayListDispatch(sequencePlayList);
            changePlayListDispatch([currentSong]);
            setModeText('单曲循环')
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
            setModeText('随机播放')
        }
        changeModeDispatch(newMode);
        toastRef.current.show();
    };

    // 歌曲播放结束
    const handleAudioEnd  = () => {
        if(mode === playMode.loop){
            handleLoop();
        }else{
            handleNext();
        }
    }

    const handleError = () => {
        setSongReady(true)
        alert ("播放出错");
    };

    return (
        <Fragment>
            {
                !isEmptyObject(currentSong) && <MiniPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    playing={playing}
                    toggleFullScreen={toggleFullScreenDispatch}
                    clickPlaying={clickPlaying}
                    percent={percent}
                ></MiniPlayer>
            }
            {
                !isEmptyObject(currentSong) && <NormalPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    playing={playing}
                    toggleFullScreen={toggleFullScreenDispatch}
                    clickPlaying={clickPlaying}
                    percent={percent}
                    currentTime={currentTime}//播放时间
                    duration={duration} // 总时长
                    onProgressChange={onProgressChange} // 滑动滚动条
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    mode={mode}
                    changeMode={changeMode}
                >
                </NormalPlayer>
            }

            <audio
                ref={audioRef}
                onTimeUpdate={updateTime}
                onEnded={handleAudioEnd}
                onError={handleError}
            ></audio>
            <Toast
                text={modeText}
                ref={toastRef}
            ></Toast>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayingDispatch(data) {
            dispatch(actionCreators.changePlayingState(data));
        },
        toggleFullScreenDispatch(data) {
            dispatch(actionCreators.changeFullScreen(data));
        },
        togglePlayListDispatch(data) {
            dispatch(actionCreators.changeShowPlayList(data));
        },
        changeCurrentIndexDispatch(index) {
            dispatch(actionCreators.changeCurrentIndex(index));
        },
        changeCurrentDispatch(data) {
            dispatch(actionCreators.changeCurrentSong(data));
        },
        changeModeDispatch(data) {
            dispatch(actionCreators.changePlayMode(data));
        },
        changePlayListDispatch(data) {
            dispatch(actionCreators.changePlayList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Player));
