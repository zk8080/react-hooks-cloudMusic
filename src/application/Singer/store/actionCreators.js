/*
 * @Author: your name
 * @Date: 2020-01-07 12:47:03
 * @LastEditTime : 2020-01-07 13:04:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singer/store/actionCreators.js
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest } from '../../../api/request';

export const changeArtist = (data) => ({
    type: actionTypes.CHANGE_ARTIST,
    data: fromJS(data)
})

export const changeSongs = (data) => ({
    type: actionTypes.CHANGE_SONGS_OF_ARTIST,
    data: fromJS (data)
})
export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getSingerInfo = (id) => {
    return dispatch => {
        getSingerInfoRequest(id)
            .then(data => {
                dispatch(changeArtist(data.artist));
                dispatch(changeSongs(data.hotSongs));
                dispatch(changeEnterLoading(false));
            })
            .catch(e => {
                console.log(e)
            }) 
    }
}

