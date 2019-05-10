import {objectAppend} from "../utils";
import {Platform} from 'react-native';

const defaultState = {
    platform:Platform.OS==='ios'?'ios':'android',
    accessToken:'',
    refreshToken:''
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'APP_TOKEN_CHANGE':
            newState.accessToken = action.accessToken;
            newState.refreshToken = action.refreshToken;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
