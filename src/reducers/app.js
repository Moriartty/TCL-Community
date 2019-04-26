import {objectAppend} from "../utils";
import {Platform} from 'react-native';

const defaultState = {
    platform:Platform.OS==='ios'?'ios':'android'
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}