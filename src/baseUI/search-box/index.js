/*
 * @Author: your name
 * @Date: 2020-04-03 10:56:40
 * @LastEditTime: 2020-04-07 13:44:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/search-box/index.js
 */

import React, { memo, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { SearchBoxWrapper } from './style';
import { debounce } from '../../api/utils';


function SearchBox(props) {

    // 父组件传来的query关键字
    const { newQuery } = props;
    // 处理查询的方法
    const { handleQuery } = props;

    const [ query, setQuery ] = useState('');

    const queryRef = useRef(null);

    // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
    const displayStyle = query ? {display: 'block'}: {display: 'none'};

    const handleChange = (e) => {
        // 搜索框内容改变时的逻辑
        setQuery(e.target.value)
    };
    const clearQuery = () => {
        // 清空框内容的逻辑
        setQuery('');
        queryRef.current.focus();
    }

    // 缓存父组件传来的处理查询的方法
    // const handleQueryDebounce = useMemo(() => {
    //     return debounce(handleQuery, 500)
    // }, [handleQuery])
    const handleQueryDebounce = useCallback(debounce(handleQuery, 500), [handleQuery])

    useEffect(() => {
        // 进场input自动获取焦点 出现光标
        queryRef.current.focus();
    }, [])

    useEffect(() => {
        // 内容改变时 调用父组件的处理查询方法
        handleQueryDebounce(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        // 如果父组件点击热门搜索的关键词 则替换当前值 并且进行搜索
        setQuery(newQuery);
    }, [newQuery])

    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
            <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
        </SearchBoxWrapper>
    )
}

export default memo(SearchBox);
