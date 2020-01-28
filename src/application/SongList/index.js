/*
 * @Author: your name
 * @Date: 2020-01-06 22:18:46
 * @LastEditTime : 2020-01-28 10:58:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/SongList/style.js
 */
import React, { memo, forwardRef } from 'react';
import { SongList, SongItem } from './style';
import { getName } from '../../api/utils';
import {connect} from 'react-redux';
import * as actionCreators from '../Player/store/actionCreators';

const SongsList = forwardRef((props, ref) => {

    const { collectCount, showCollect, songs } = props;

    const { changeCurrentIndexDispatch, changePlayListDispatch, changeSequecePlayListDispatch, musicAnimation } = props;

    const selectItem = (e, index) => {
        changePlayListDispatch(songs);
        changeSequecePlayListDispatch(songs);
        changeCurrentIndexDispatch(index);
        musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
    }

    const totalCount = songs.length;

    const collect = (count) => {
        return (
            <div className="add_list">
                <i className="iconfont">&#xe62d;</i>
                <span > 收藏 ({Math.floor (count/1000)/10} 万)</span>
            </div>
        )
    }

    const songList = (list) => {
        let res = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            res.push(
                <li key={item.id} onClick={(e) => selectItem (e, i)}>
                    <span className="index">{i + 1}</span>
                    <div className="info">
                        <span>{item.name}</span>
                        <span>
                        { item.ar ? getName(item.ar): getName(item.artists) } - { item.al ? item.al.name : item.album.name}
                        </span>
                    </div>
                </li>
            )
        }
        return res;
    }

    return (
        <SongList ref={ref} showBackground={props.showBackground}>
            <div className="first_line">
                <div className="play_all" onClick={(e) => selectItem(e, 0)}>
                <i className="iconfont">&#xe6e3;</i>
                <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
                </div>
                { showCollect ? collect(collectCount) : null}
            </div>
            <SongItem>
                { songList(songs) }
            </SongItem>
        </SongList>
    )
})

const mapDispatchToProps = (dispatch) => {
    return {
        changePlayListDispatch(data){
            dispatch(actionCreators.changePlayList(data))
        },
        changeCurrentIndexDispatch(data){
            dispatch(actionCreators.changeCurrentIndex(data))
        },
        changeSequecePlayListDispatch(data){
            dispatch(actionCreators.changeSequecePlayList(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(memo(SongsList));