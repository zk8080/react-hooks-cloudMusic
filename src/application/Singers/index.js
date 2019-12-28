/*
 * @Author: your name
 * @Date: 2019-12-24 15:19:08
 * @LastEditTime : 2019-12-28 21:28:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singers/index.js
 */
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListItem, ListContainer } from './style';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';

function Singers(props) {

    const { enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;

    const [ category, setCategory ] = useState('');
    const [ alpha, setAlpha ] = useState('');

    useEffect(() => {
        getHotSingerDispatch();
    // eslint-disable-next-line
    }, []);
    
    let handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, val);
    }

    let handleUpdateCatetory = (val) => {
        setCategory(val);
        updateDispatch(val, alpha);
    }

    const renderSingerList = () => {
        const {singerList} = props;
        const list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem>
                                <div className="img_wrapper">
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
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
            <ListContainer>
                <Scroll>
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            { enterLoading && <Loading></Loading> }
        </NavContainer>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
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
