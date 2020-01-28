/*
 * @Author: your name
 * @Date: 2019-12-24 15:19:08
 * @LastEditTime : 2020-01-28 12:16:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singers/index.js
 */
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import LazyLoad, {forceCheck} from 'react-lazyload';
import * as actionCreators from './store/actionCreators';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListItem, ListContainer } from './style';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { renderRoutes } from 'react-router-config';
 
function Singers(props) {

    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount, songsCount } = props;
    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;

    const [ category, setCategory ] = useState('');
    const [ alpha, setAlpha ] = useState('');

    useEffect(() => {
        if( !singerList.size ){
            getHotSingerDispatch();
        }
    // eslint-disable-next-line
    }, []);
    
    const handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, val);
    }

    const handleUpdateCatetory = (val) => {
        setCategory(val);
        updateDispatch(val, alpha);
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch (category, alpha, category === '', pageCount);
    };
    
    const handlePullDown = () => {
        pullDownRefreshDispatch (category, alpha);
    };

    const enterDetail = (id) => {
        props.history.push(`/singers/${id}`)
    }

    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="singer"/>}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <NavContainer>
            <Horizen 
                list={categoryTypes} 
                title={'分类 (默认热门):'}
                curVal={category}
                handClick={val => handleUpdateCatetory(val)}
            ></Horizen>
            <Horizen 
                list={alphaTypes} 
                title={'首字母:'}
                curVal={alpha}
                handClick={val => handleUpdateAlpha(val)}
            ></Horizen>
            <ListContainer
                play={songsCount}
            >
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            { enterLoading && <Loading></Loading> }
            {renderRoutes(props.route.routes)}
        </NavContainer>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
    songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(actionCreators.getHotSingerList())
        },
        // 切换标签 更新数据
        updateDispatch(category, alpha){
            dispatch(actionCreators.changePageCount(0));
            dispatch(actionCreators.changeEnterLoading(true));
            dispatch(actionCreators.getSingerList(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDispatch(category, alpha, hot, count){
            dispatch(actionCreators.changePullUpLoading(true));
            dispatch(actionCreators.changePageCount(count+1));
            if(hot){
                dispatch(actionCreators.refreshMoreHotSingerList());
            } else {
                dispatch(actionCreators.refreshMoreSingerList(category, alpha));
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(category, alpha) {
            dispatch(actionCreators.changePullDownLoading(true));
            dispatch(actionCreators.changePageCount(0));//属于重新获取数据
            if(category === '' && alpha === ''){
                dispatch(actionCreators.getHotSingerList());
            } else {
                dispatch(actionCreators.getSingerList(category, alpha));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
