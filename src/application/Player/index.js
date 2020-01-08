/*
 * @Author: your name
 * @Date: 2020-01-07 20:15:46
 * @LastEditTime : 2020-01-08 22:05:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/index.js
 */
import React, { memo, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';

function Player(props) {

    const { fullScreen } =  props;

    const { toggleFullScreenDispatch } = props;

    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{name: "薛之谦"}]
    }
    return (
        <Fragment>
            <MiniPlayer
                song={currentSong}
                fullScreen={fullScreen}
                toggleFullScreen={toggleFullScreenDispatch}
            ></MiniPlayer>
            <NormalPlayer
                song={currentSong}
                fullScreen={fullScreen}
                toggleFullScreen={toggleFullScreenDispatch}
            >
            </NormalPlayer>
        </Fragment>
    )
}

const mapStateToProps =  (state) => ({
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
        togglePlayingDispatch (data) {
            dispatch (actionCreators.changePlayingState(data));
          },
          toggleFullScreenDispatch (data) {
            dispatch(actionCreators.changeFullScreen(data));
          },
          togglePlayListDispatch (data) {
            dispatch(actionCreators.changeShowPlayList(data));
          },
          changeCurrentIndexDispatch (index) {
            dispatch(actionCreators.changeCurrentIndex(index));
          },
          changeCurrentDispatch (data) {
            dispatch(actionCreators.changeCurrentSong(data));
          },
          changeModeDispatch (data) {
            dispatch(actionCreators.changePlayMode(data));
          },
          changePlayListDispatch (data) {
            dispatch(actionCreators.changePlayList(data));
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Player));
