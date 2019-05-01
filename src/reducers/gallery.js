import {objectAppend} from "../utils";
import {RefreshState} from "react-native-refresh-list-view";

const defaultState = {
    data: [],
    refreshState: RefreshState.Idle,
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'GALLERY_LIST_DATA_LOAD':
            newState.data = action.data;
            break;
        case 'GALLERY_LIST_LOADING':
            newState.refreshState = action.refreshState;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
