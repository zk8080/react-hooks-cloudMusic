/*
 * @Author: your name
 * @Date: 2020-01-06 17:40:18
 * @LastEditTime : 2020-01-28 11:40:52
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
import { HEADER_HEIGHT } from '../../api/config';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import MusicNote from '../../baseUI/music-note/index';
import Loading from '../../baseUI/loading/index';

function Singer(props) {
    const [ showStatus, setShowStatus ] = useState(true);
    const { artist: immutableArtist, songs: immutableSongs, enterLoading } = props;
    const { getSingerInfoDispatch } = props;

    const handleBack = useCallback(() => {
        setShowStatus(false)
    }, []);

    const initialImgHeight = useRef(0);

    const imgWrapperRef = useRef();
    const songScrollRef = useRef();
    const songScrollWrapperRef = useRef();
    const headerRef = useRef();
    const bgLayerRef = useRef();
    const collectButtonRef = useRef();
    const musicNoteRef = useRef();


    const artist = immutableArtist ? immutableArtist.toJS() : {};
    const songs = immutableSongs ?  immutableSongs.toJS() : [];

    // 往上的偏移量
    const OFFSET = 5;

    useEffect(() => {
        // 图片高度
        const imgHeight = imgWrapperRef.current.offsetHeight;
        // 保存图片高度 供歌曲滚动组件 滑动时使用
        initialImgHeight.current = imgHeight;
        // 设置歌曲滚动组件父元素距离顶部的距离
        songScrollWrapperRef.current.style.top = `${imgHeight - OFFSET}px`;
        // 设置遮罩层距离顶部的高度
        bgLayerRef.current.style.top = `${imgHeight - OFFSET}px`;
        // 刷新滚动组件
        songScrollRef.current.refresh();

    }, [])

    useEffect(() => {
        const id = props.match.params.id;
        if( !artist.size || !songs.size ){
            getSingerInfoDispatch(id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScroll = useCallback((pos) => {
        let imgHeight = initialImgHeight.current;
        // 当前滚动的Y轴距离
        const curScrollY = pos.y;

        // 获取需要的dom
        const imgDom = imgWrapperRef.current;
        const buttonDom = collectButtonRef.current;
        const headerDom = headerRef.current;
        const layerDom = bgLayerRef.current;
        // 歌手列表组件距离header组件的距离 
        const minScrollY = -(imgHeight - OFFSET) + HEADER_HEIGHT;

        // 滚动的距离占图片高度的百分比 列表下拉 图片随比例放大
        const percent = Math.abs(curScrollY/imgHeight);

        // 图片下拉
        if( curScrollY >  0 ){
            // 图片按照比例缩放
            imgDom.style["transform"] = `scale(${1+percent})`;
            // 按钮跟着往下移动
            buttonDom.style["transform"] = `translate3d(0, ${curScrollY}px, 0)`;
            // 遮罩层跟着移动
            layerDom.style.top = `${imgHeight - OFFSET + curScrollY}px`;
        }else if ( curScrollY >= minScrollY ) {
            // 往上滑动，但是 没超过 header组件 

            // 遮罩跟着偏移
            layerDom.style.top = `${imgHeight - OFFSET - Math.abs(curScrollY)}px`;
            // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
            layerDom.style.zIndex = 1;
            imgDom.style.zIndex = -1;

            // 每次往上滑动 初始化图片的高度， 因为往上滑动超出header组件高度时会修改图片高度为header高度
            imgDom.style.paddingTop = "75%";
            imgDom.style.height = 0;
            

            // 按钮跟着移动且渐渐变透明
            buttonDom.style["transform"] = `translate3d(0, ${curScrollY}px, 0)`;
            buttonDom.style["opacity"] = `${1 - percent * 2}`;

        }else if(curScrollY < minScrollY) {
            // 上滑距离超出header组件

            // 遮罩偏移量 固定为Header高度 减去 偏移量OFFSET
            layerDom.style.top = `${HEADER_HEIGHT - OFFSET}px`;

            // 防止溢出的歌单内容遮住 Header  将header组件的z-index设置为最大
            layerDom.style.zIndex = 1;
            headerDom.style.zIndex = 100;
            
            // 此时图片高度与 Header 一致
            imgDom.style.height = `${HEADER_HEIGHT}px`;
            imgDom.style.paddingTop = 0;
            imgDom.style.zIndex = 99;
        }



    }, [])

    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({ x, y });
    };

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
                    title={artist.name}
                    handleClick={handleBack}
                    ref={headerRef}
                ></Header>
                <ImgWrapper 
                    bgUrl={artist.picUrl}
                    ref={imgWrapperRef}
                >
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButtonRef}> 
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer ref={bgLayerRef}></BgLayer>
                <SongListWrapper ref={songScrollWrapperRef}>
                    <Scroll 
                        ref={songScrollRef}
                        onScroll={handleScroll}
                    >
                        <SongList
                            songs={songs}
                            showCollect={false}
                            musicAnimation={musicAnimation}
                        ></SongList>
                    </Scroll>
                </SongListWrapper>
                <MusicNote ref={musicNoteRef}></MusicNote>
                {
                    enterLoading && <Loading></Loading>
                }
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    artist: state.getIn(["singerInfo", "artist"]),
    songs: state.getIn(["singerInfo", "songsOfArtist"]),
    enterLoading: state.getIn(["singerInfo", "enterLoading"]),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerInfoDispatch(id){
            dispatch(actionCreators.changeEnterLoading(true));
            dispatch(actionCreators.getSingerInfo(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singer));
