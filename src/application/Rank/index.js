/*
 * @Author: your name
 * @Date: 2019-12-24 15:19:19
 * @LastEditTime : 2020-01-06 17:33:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Rank/index.js
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import { filterIndex }  from '../../api/utils';
import { Container, List, ListItem, SongList } from './style';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll';
import {renderRoutes} from 'react-router-config';

function Rank(props) {

    const { rankList, enterLoading } = props;

    const { getRankListDispatch } = props;

    useEffect(() => {
        if( !rankList.size ){
            getRankListDispatch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
            {
                list.map((item, index) => {
                    return <li key={index}>{index+1}. {item.first} - {item.second}</li>
                })
            }
            </SongList>
        ) : null;
    }

    const enterDetail = (id) => {
        props.history.push(`/rank/${id}`)
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.id} tracks={item.tracks} onClick={() => {enterDetail(item.id)}}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="rank"/>
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{item.updateFrequency}</span>
                                </div>
                                {
                                    renderSongList(item.tracks)
                                }
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const list = rankList ? rankList.toJS() : [];
    const globalStartIndex = filterIndex(list);
    const globalList = list.slice(globalStartIndex);
    const officialList = list.slice(0, globalStartIndex);
    let displayStyle = enterLoading ? {"display":"none"}:  {"display": ""};
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}> 官方榜 </h1>
                    { renderRankList (officialList) }
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    { renderRankList (globalList, true) }
                    { enterLoading && <Loading></Loading> }
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    enterLoading: state.getIn(['rank', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDispatch() {
            dispatch(actionCreators.getRankList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
