/*
 * @Author: your name
 * @Date: 2020-01-04 16:08:18
 * @LastEditTime : 2020-01-04 17:06:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Album/store/actionCreators.js
 */
import * as actionTypes from './constants';
import { fromJS } from "immutable";
import { getAlbumDetailRequest } from '../../../api/request';

export const changeCurrentAlbum = (data) => ({
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getAlbumDetail = (id) => {
    return dispatch => {
        getAlbumDetailRequest(id)
            .then(res => {
                let data = res.playlist;
                dispatch(changeCurrentAlbum(data))
                dispatch(changeEnterLoading(false))
            })
            .catch(e => {
                console.log(e)
            })
    }
}
