/*
 * @Author: your name
 * @Date: 2019-12-25 10:01:40
 * @LastEditTime : 2019-12-26 21:34:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/components/list/index.js
 */
import React, {memo} from 'react';
import LazyLoad from 'react-lazyload';
import { ListWrap, List, ListItem } from './style';
import { getCount } from '../../api/utils';

function RecommendList(props) {
    const { recommendList } = props;
    return (
        <ListWrap>
            <h1 className='title'>推荐歌单</h1>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem key={item.id}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    <LazyLoad
                                        placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}
                                    >
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </ListWrap>
    )
}

export default memo(RecommendList);
