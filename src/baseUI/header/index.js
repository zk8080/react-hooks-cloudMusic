/*
 * @Author: your name
 * @Date: 2020-01-03 14:55:02
 * @LastEditTime : 2020-01-04 15:54:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/header/index.js
 */
import React, { memo, forwardRef } from 'react';
import { HeaderContainer } from './style';
import PropTypes from 'prop-types';

const Header = forwardRef((props, ref) => {
    const { handleClick, title, isMarquee } = props;
    return (
        <HeaderContainer ref={ref}>
            <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
            {
                // eslint-disable-next-line jsx-a11y/no-distracting-elements
                isMarquee ? <marquee><h1>{title}</h1></marquee>
                    :  <h1>{title}</h1>
            }
            
        </HeaderContainer>
    )
}) 

Header.defaultProps = {
    handleClick: () => {},
    title: "标题",
};

Header.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
};

export default  memo(Header);
