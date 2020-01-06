/*
 * @Author: your name
 * @Date: 2020-01-02 21:58:17
 * @LastEditTime : 2020-01-06 22:21:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Album/index.js
 */
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Container, TopDesc, Menu, SongList, SongItem } from './style';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux';
import Header from '../../baseUI/header/index';
import Scroll from '../../baseUI/scroll';
import { getCount, getName, isEmptyObject } from '../../api/utils';
import style from '../../assets/global-style';
import { actionCreators } from './store/index';
import Loading from '../../baseUI/loading';

export const HEADER_HEIGHT = 45;

function Album(props) {

    const [ showStatus, setShowStatus ] = useState(true);

    const [ isMarquee, setIsMarquee ] = useState(false);

    const [title, setTitle] = useState ("歌单");

    const headerRef = useRef();

    // 从路由中拿到歌单的 id
    const id = props.match.params.id;

    const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
    const { getAlbumDataDispatch } = props;

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id])

    let currentAlbum = currentAlbumImmutable ? currentAlbumImmutable.toJS () : {};
    const handleBack = useCallback(() => {
        setShowStatus(false);
    }, []);

    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbum.coverImgUrl} alt=""/>
                    <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{Math.floor (currentAlbum.subscribedCount/1000)/10} 万 </span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                    <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} alt=""/>
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        )
    }

    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </Menu>
        )
    }

    const handleScroll = (pos) => {
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y/minScrollY);
        let headerDom = headerRef.current;
        // 滑过顶部的高度开始变化
        if (pos.y < minScrollY) {
          headerDom.style.backgroundColor = style["theme-color"];
          headerDom.style.opacity = Math.min(1, (percent-1)/2);
          setTitle(currentAlbum.name);
          setIsMarquee (true);
        } else {
          headerDom.style.backgroundColor = "";
          headerDom.style.opacity = 1;
          setTitle("歌单");
          setIsMarquee (false);
        }
    }

    const renderSongList = () => {
        return (
            <SongList>
                <div className="first_line">
                <div className="play_all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
                </div>
                <div className="add_list">
                    <i className="iconfont">&#xe62d;</i>
                    <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
                </div>
                </div>
                <SongItem>
                {
                    currentAlbum.tracks.map((item, index) => {
                    return (
                        <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                            <span>{item.name}</span>
                            <span>
                            {getName(item.ar)} - {item.al.name}
                            </span>
                        </div>
                        </li>
                    )
                    })
                }
                </SongItem>
            </SongList>
        )
    }

    return (
        <CSSTransition
            in={showStatus}  
            timeout={300} 
            classNames="fly" 
            appear={true} 
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header
                    title={title} 
                    handleClick={handleBack}
                    ref={headerRef} 
                    isMarquee={isMarquee}
                ></Header>
                {!isEmptyObject(currentAlbum) ?
                    (
                        <Scroll
                        bounceTop={false}
                        onScroll={handleScroll}
                        >
                        <div>
                            { renderTopDesc() }
                            { renderMenu() }
                            { renderSongList() }
                        </div>
                        </Scroll>
                    )
                    : null
                }
                {
                    enterLoading && <Loading></Loading>
                }
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch (id) {
            dispatch(actionCreators.changeEnterLoading(true));
            dispatch(actionCreators.getAlbumDetail(id));
        },
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(memo(Album));
