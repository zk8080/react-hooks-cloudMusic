/*
 * @Author: your name
 * @Date: 2020-01-09 22:52:08
 * @LastEditTime : 2020-01-09 22:55:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/progressBar/index.js
 */
import React, { memo } from 'react';
import { ProgressBarWrapper } from './style';

function ProgressBar(props) {
    return (
        <ProgressBarWrapper>
            <div className="bar-inner">
                <div className="progress"></div>
                <div className="progress-btn-wrapper">
                    <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    )
}

export default memo(ProgressBar)