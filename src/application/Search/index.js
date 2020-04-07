/*
 * @Author: your name
 * @Date: 2020-04-03 10:30:35
 * @LastEditTime: 2020-04-07 17:21:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Search/index.js
 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { Container, ShortcutWrapper, HotKey, List, ListItem, SongItem } from './style';
import { CSSTransition } from 'react-transition-group';
import SearchBox from '../../baseUI/search-box';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { getSongDetail } from './../Player/store/actionCreators';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import MusicNote from '../../baseUI/music-note';
import { getName } from '../../api/utils';
import LazyLoad, { forceCheck } from 'react-lazyload';

function Search(props) {

    const { hotList: immutableHotList, enterLoading, suggestList: immutableSuggestList, songsList: immutableSongsList, songsCount } = props;

    const {
        getHotKeyWordsDispatch,
        changeEnterLoadingDispatch,
        getSuggestListDispatch,
        getSongDetailDispatch
    } = props;

    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');

    const musicNoteRef = useRef();

    const suggestList = immutableSuggestList.toJS();
    const songsList = immutableSongsList.toJS();
    const hotList = immutableHotList.toJS();

    const searchBack = () => {
        setShow(false);
    }

    const handleQuery = (result) => {
        setQuery(result)
        if (!result) return;
        changeEnterLoadingDispatch(true);
        getSuggestListDispatch(result)
    }

    useEffect(() => {
        setShow(true);
        if (!hotList.length) {
            getHotKeyWordsDispatch()
        }
    }, [getHotKeyWordsDispatch, hotList.length])

    const renderHotKey = () => {
        return (
            <ul>
                {
                    hotList.map(item => {
                        return (
                            <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                                <span>{item.first}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    const renderAlbum = () => {
        let albums = suggestList.playlists;
        if (!albums || !albums.length) return;
        return (
            <List>
                <h1 className="title">相关歌单</h1>
                {
                    albums.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index} onClick={() => props.history.push(`/album/${item.id}`)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                                        <img src={item.coverImgUrl} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">歌单: {item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };
    const renderSingers = () => {
        let singers = suggestList.artists;
        if (!singers || !singers.length) return;
        return (
            <List>
                <h1 className="title">相关歌手</h1>
                {
                    singers.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer" />}>
                                        <img src={item.picUrl} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">歌手: {item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    const renderSongs = () => {
        return (
            <SongItem style={{ paddingLeft: "20px" }} >
                {
                    songsList.map(item => {
                        return (
                            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                                <div className="info">
                                    <span>{item.name}</span>
                                    <span>
                                        {getName(item.artists)} - {item.album.name}
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </SongItem>
        )
    };

    const selectItem = (e, id) => {
        getSongDetailDispatch(id);
        console.log(e);
        musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
    }

    return (
        <CSSTransition
            in={show}
            timeout={300}
            appear={true}
            classNames="fly"
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <Container play={songsCount}>
                <div className="search_box_wrapper">
                    <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
                </div>
                <ShortcutWrapper show={!query}>
                    <Scroll onScroll={forceCheck}>
                        <div>
                            <HotKey>
                                <h1 className="title"> 热门搜索 </h1>
                                {renderHotKey()}
                            </HotKey>
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                <ShortcutWrapper show={query}>
                    <Scroll onScorll={forceCheck}>
                        <div>
                            {renderSingers()}
                            {renderAlbum()}
                            {renderSongs()}
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                {enterLoading && <Loading></Loading>}
                <MusicNote ref={musicNoteRef} ></MusicNote>
            </Container>
        </CSSTransition>
    );
}

const mapStateToProps = (state) => ({
    hotList: state.getIn(['search', 'hotList']),
    enterLoading: state.getIn(['search', 'enterLoading']),
    suggestList: state.getIn(['search', 'suggestList']),
    songsList: state.getIn(['search', 'songsList']),
    songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatchToProps = (dispatch) => {
    return {
        getHotKeyWordsDispatch() {
            dispatch(actionCreators.getHotKeyWords());
        },
        changeEnterLoadingDispatch(data) {
            dispatch(actionCreators.changeEnterLoading(data))
        },
        getSuggestListDispatch(data) {
            dispatch(actionCreators.getSuggestList(data));
        },
        getSongDetailDispatch(id) {
            dispatch(getSongDetail(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(Search));