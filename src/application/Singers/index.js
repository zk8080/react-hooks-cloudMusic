/*
 * @Author: your name
 * @Date: 2019-12-24 15:19:08
 * @LastEditTime : 2019-12-27 16:06:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Singers/index.js
 */
import React, {useEffect, useState} from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers(props) {
    const [ category, setCategory ] = useState('');
    const [ alpha, setAlpha ] = useState('');

    let handleUpdateAlpha = (val) => {
        setAlpha(val);
    }

    let handleUpdateCatetory = (val) => {
        setCategory(val);
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
        </NavContainer>
    )
}

export default React.memo(Singers);
