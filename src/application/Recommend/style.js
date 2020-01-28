/*
 * @Author: your name
 * @Date: 2019-12-25 17:07:56
 * @LastEditTime : 2020-01-28 12:12:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/application/Recommend/style.js
 */
import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play > 0 ? '60px': 0};
  width: 100%;
`