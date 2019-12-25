/*
 * @Author: your name
 * @Date: 2019-12-24 15:18:49
 * @LastEditTime : 2019-12-24 16:45:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/index.js
 */
import React from 'react';
import Slider from '../../components/slider/index';

function Recommend(props) {

    const bannerList = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    })

    return (
        <div>
            <Slider bannerList={bannerList}></Slider>
        </div>
    )
}

export default React.memo(Recommend);
