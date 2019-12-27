/*
 * @Author: your name
 * @Date: 2019-12-27 14:51:10
 * @LastEditTime : 2019-12-27 15:53:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/horizen-item/index.js
 */
import React, {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Scroll from '../scroll';
import { List, ListItem } from './style';

function Horizen(props) {
    const {list, curVal, title} = props;
    const {handClick} = props;
    const Category = useRef(null);
    useEffect(() => {
        let categoryDom = Category.current;
        let spanElems = categoryDom.querySelectorAll('span');
        let totalWidth = 0;
        Array.from(spanElems).forEach(span => {
            totalWidth += span.offsetWidth;
        })
        categoryDom.style.width = `${totalWidth}px`;
    }, [])
    
    return (
        <Scroll direction={'horizental'}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${curVal === item.key ? "selected": ""}`}
                                    onClick={() => {handClick(item.key)}}
                                >
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

Horizen.defaultProps = {
    list: [],
    curVal: '',
    title: '',
    handClick: null
}

Horizen.propTypes = {
    list: PropTypes.array,
    curVal: PropTypes.string,
    title: PropTypes.string,
    handClick: PropTypes.func
}

export default memo(Horizen);