/*
 * @Author: your name
 * @Date: 2020-01-07 20:16:07
 * @LastEditTime: 2020-04-07 16:35:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Player/store/actionCreators.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getSongDetailRequest } from '../../../api/request';

export const changeCurrentSong = (data) => ({
    type: actionTypes.SET_CURRENT_SONG,
    data: fromJS(data)
});

export const changeFullScreen = (data) => ({
    type: actionTypes.SET_FULL_SCREEN,
    data
});

export const changePlayingState = (data) => ({
    type: actionTypes.SET_PLAYING_STATE,
    data
});

export const changeSequecePlayList = (data) => ({
    type: actionTypes.SET_SEQUECE_PLAYLIST,
    data: fromJS(data)
});

export const changePlayList = (data) => ({
    type: actionTypes.SET_PLAYLIST,
    data: fromJS(data)
});

export const changePlayMode = (data) => ({
    type: actionTypes.SET_PLAY_MODE,
    data
});

export const changeCurrentIndex = (data) => ({
    type: actionTypes.SET_CURRENT_INDEX,
    data
});

export const changeShowPlayList = (data) => ({
    type: actionTypes.SET_SHOW_PLAYLIST,
    data
});

export const deleteSong = (data) => ({
    type: actionTypes.SET_DELETE_SONG,
    data
});

export const insertSong = (data) => ({
    type: actionTypes.INSERT_SONG,
    data
});

export const getSongDetail = (id) => {
    return (dispatch) => {
      getSongDetailRequest(id).then(data => {
        let song = data.songs[0];
        console.log(song);
        dispatch(insertSong(song));
      })
    }
  }
