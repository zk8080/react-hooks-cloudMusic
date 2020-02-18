/*
 * @Author: your name
 * @Date: 2020-02-10 17:03:01
 * @LastEditTime : 2020-02-10 17:29:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/baseUI/confirm/style.js
 */
import styled, {keyframes} from 'styled-components';
import style from '../../assets/global-style';

const confirmFadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const confirmZoom = keyframes`
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
`

export const ConfirmWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color-shadow"]};
  &.confirm-fade-enter-active{
    animation: ${confirmFadeIn} 0.3s;
    .confirm_content{
      animation: ${confirmZoom} 0.3s
    }
  }
  >div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 100;
    .confirm_content{
      width: 270px;
      border-radius: 13px;
      background: ${style["highlight-background-color"]};
      .text{
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: ${style["font-size-l"]};
        color: ${style["font-color-desc-v2"]};
      }
      .operate{
        display: flex;
        align-items: center;
        text-align: center;
        font-size: ${style["font-size-l"]};
        .operate_btn{
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid ${style["border-color"]};
          color: ${style["font-color-desc"]};
          &.left{
            border-right: 1px solid ${style["border-color"]};
          }
        }
      }
    }
  }
`