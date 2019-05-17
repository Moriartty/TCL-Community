/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import screen from './screen'
import system from './system'

/**
 * 主要用于reducer里面
 * 对于react，reducer必须返回一个新的state，react才会重新渲染
 * 原来情况：即使改变一个state里的属性，也要调用objectAssign进行深复制，对于那些没有改变过的属性没必要复制
 * 改进情况：只为改变的属性创造一个新的对象，然后把那些没改变的属性直接“挂载”到新对象中，属于有选择地浅复制
 */
export function objectAppend (obj0, obj) {
    for (var k in obj) {
        if (!obj0.hasOwnProperty(k)) {
            obj0[k] = obj[k];
        }
    }
    return obj0;
}

export function findTargetMenu (list,targetId){
    const index = ~~targetId.toString().split('')[0]-1;
    return list[index].list.find(o=>{
        return o.id==targetId;
    })
}

export function getTimeStamp(current,happenTime){
    const duration = parseInt((current-happenTime)/1000);
    if(duration<60)
        return duration+'秒前';
    else if(duration>=60&&duration<60*60)
        return parseInt(duration/60)+'分钟前';
    else if(duration>=60*60&&duration<60*60*24)
        return parseInt(duration/(60*60))+'小时前';
    else
        return parseInt(duration/(60*60*24))+'天前';

}

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
//将blob转换为file
export function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}



const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;

    const patchedPostMessage = (message, targetOrigin, transfer) => {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;


export {screen, system,patchPostMessageJsCode}
