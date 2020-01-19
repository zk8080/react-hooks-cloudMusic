/*
 * @Author: your name
 * @Date: 2019-12-25 10:14:34
 * @LastEditTime : 2020-01-19 10:48:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /cloud-music/src/api/utils.js
 */
export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

export const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
        return i + 1;
        }
    }
};

export const getName = list => {
    let str = "";
    list.map ((item, index) => {
      str += index === 0 ? item.name : "/" + item.name;
      return item;
    });
    return str;
};

//判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;

export const getSongUrl = id => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

//转换歌曲播放时间
export const formatPlayTime = interval => {
    interval = interval | 0;
    const minute = (interval / 60) | 0;
    const second = (interval % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
};
