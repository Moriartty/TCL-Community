
//
// const token = {
//     access_token:'access_token0',
//     refresh_token:'refresh_token0'
// };
const accessToken = 'access_token0';
const refreshToken = 'refresh_token0';

let actions = {};

actions.login = (act,pwd,cb) => dispatch => {
    dispatch({type:'LOGIN_LOADING',loading:true});
    dispatch({type:'LOGIN_MODAL_VISIBLE',visible:true});
    setTimeout(function () {
        //存储用户Token
        global.storage._save('accessToken',accessToken,600*1000);
        global.storage._save('refreshToken',refreshToken,600*1000);
        dispatch({type:'APP_TOKEN_CHANGE',accessToken,refreshToken});
        dispatch({type:'LOGIN_LOADING',loading:false});
        dispatch({type:'LOGIN_MODAL_VISIBLE',visible:false});
        cb();
    },2000)
};

actions.logout = (cb) => dispatch => {
    dispatch({type:'APP_TOKEN_CHANGE'});
    global.storage._remove('accessToken','refreshToken');
    cb();
};

export default actions;
