/*
 * @Author: your name
 * @Date: 2019-12-24 15:18:49
 * @LastEditTime : 2020-01-28 12:11:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/index.js
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import * as actionCreators from './store/actionCreators';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { Content } from './style';
import { renderRoutes } from  'react-router-config';

function Recommend(props) {

    const { bannerList, recommendList, enterLoading, songsCount } = props;

    const {getBannerDataDispatch, getRecommendDataDispatch} = props;

    useEffect(() => {
        // immutable数据结构中有size属性， 代表数据长度 如果已存在数据长度则不再进行请求接口
        if( !bannerList.size ){
            getBannerDataDispatch();
        }
        
        if(!recommendList.size){
            getRecommendDataDispatch();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];
    return (
        <Content play={songsCount}>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            { enterLoading && <Loading></Loading>}
            {renderRoutes(props.route.routes)}
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
    songsCount: state.getIn(['player', 'playList']).size
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionCreators.getBannerList())
        },
        getRecommendDataDispatch() {
            dispatch(actionCreators.getRecommendList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
