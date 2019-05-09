import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 600*1000,
    enableCache: true,
});
// 全局变量
global.storage = storage;
const access_token = 'moriarty'

let actions = {};

actions.login = (act,pwd,cb) => dispatch => {
    dispatch({type:'LOGIN_LOADING',loading:true});
    dispatch({type:'LOGIN_MODAL_VISIBLE',visible:true});
    setTimeout(function () {
        //存储用户Token
        global.storage.save({
            key:'token',
            data: access_token,
            expires: 600*1000
        });
        dispatch({type:'LOGIN_LOADING',loading:false});
        dispatch({type:'LOGIN_MODAL_VISIBLE',visible:false});
        cb();
    },2000)
};

actions.logout = (cb) => dispatch => {
    global.storage.remove({key:'token'});
    cb();
};

export default actions;
