/*
 * @Author: your name
 * @Date: 2020-01-06 17:40:18
 * @LastEditTime : 2020-01-06 22:56:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singer/index.js
 */
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import {Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper} from './style';
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import SongList from '../SongList';

function Singer(props) {
    const [ showStatus, setShowStatus ] = useState(true);

    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
        ]
    }

    const handleBack = useCallback(() => {
        setShowStatus(false)
    }, []);

    const imgWrapperRef = useRef();
    const songScrollRef = useRef();
    const songScrollWrapperRef = useRef();
    const headerRef = useRef();
    const bgLayerRef = useRef();

    // 往上的偏移量
    const OFFSET = 5;

    useEffect(() => {
        // 图片高度
        const imgHeight = imgWrapperRef.current.offsetHeight;
        // 设置歌曲滚动组件父元素距离顶部的距离
        songScrollWrapperRef.current.style.top = `${imgHeight - OFFSET}px`;
        // 设置遮罩层距离顶部的高度
        bgLayerRef.current.style.top = `${imgHeight - OFFSET}px`;
        // 刷新滚动组件
        songScrollRef.current.refresh();

    }, [])

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack ()}
        >
            <Container>
                <Header
                    title={'歌手'}
                    handleClick={handleBack}
                    ref={headerRef}
                ></Header>
                <ImgWrapper 
                    bgUrl={artist.picUrl}
                    ref={imgWrapperRef}
                >
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer ref={bgLayerRef}></BgLayer>
                <SongListWrapper ref={songScrollWrapperRef}>
                    <Scroll ref={songScrollRef}>
                        <SongList
                            songs={artist.hotSongs}
                            showCollect={false}
                        ></SongList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default memo(Singer);
