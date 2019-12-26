/*
 * @Author: your name
 * @Date: 2019-12-25 11:11:01
 * @LastEditTime : 2019-12-25 17:14:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/scroll/index.js
 */
import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef, memo} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import {ScrollContainer} from './style';

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();

    const { children, direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom, pullUp, pullDown, onScroll} = props;
    
    const scrollContainerRef = useRef();

    // 创建better-scroll实例， 只创建一次
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce:{
            top: bounceTop,
            bottom: bounceBottom
            }
        })
        setBScroll(scroll);
        return () => {
            // 卸载的时候 清除scroll实例
            setBScroll(null);
        }
    }, []);

    // 每次重新渲染的时候 调用实例刷新方法，防止无法滚动
    useEffect(() => {
        if( refresh && bScroll ){
            bScroll.refresh();
        }
    })
    
    // 给实例绑定onScroll事件
    useEffect(() => {
        if( !onScroll || !bScroll ) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll)
        });
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])

    // 判断上拉到底，进行上拉刷新的函数调用
    useEffect(() => {
        if(!pullUp || !bScroll) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部
            if(bScroll.y <= bScroll.maxScrollY + 100){
                pullUp()
            }
        })
        return () => {
            bScroll.off('scrollEnd')
        }

    }, [pullUp, bScroll])

    // 判断下拉操作，进行下拉刷新的函数调用
    useEffect(() => {
        if(!pullDown || !bScroll) return;
        bScroll.on('touchEnd', (pos) => {
            // 判断下拉
            if(pos.y > 50){
                pullDown()
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }

    }, [pullDown, bScroll])

    /**
     * 暴露组件内部方法 供外届进行调用 
     * 外界组件可以使用 ref.current.refresh()
     * 所以要使用forwardRef包装组件，接受外部组件传进来的ref，
     * hooks中提供了useImperativeHandle 可以暴露实例
    */
    useImperativeHandle(ref, () => ({
        refresh: () => {
            if(bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0)
            }
        },
        getBScroll: () => {
            if(bScroll){
                return bScroll;
            }
        }
    }))

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {children}
        </ScrollContainer>
    );
});

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
    click: PropTypes.bool,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};

export default memo(Scroll);
