import {objectAppend} from "../utils";
import {RefreshState} from "react-native-refresh-list-view";

const defaultState = {
    availableRewards: [],
    refreshState: RefreshState.Idle,
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'REWARDS_AVAILABLE_LIST_DATA_LOAD':
            newState.availableRewards = action.data;
            break;
        case 'REWARDS_LIST_LOADING':
            newState.refreshState = action.refreshState;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
