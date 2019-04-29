import {objectAppend} from "../utils";
import {RefreshState} from "react-native-refresh-list-view";

const defaultState = {
    categoryList:[],
    hottestListData:[],
    newestListData:[],
    essenceListData:[],
    toppingNews:[],
    refreshState:RefreshState.Idle
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'PLATE_CATEGORY_LIST_LOAD':
            newState.categoryList = action.data;
            break;
        case 'PLATE_HOTTEST_LIST_DATA_LOAD':
            newState.hottestListData = action.data;
            break;
        case 'PLATE_NEWEST_LIST_DATA_LOAD':
            newState.newestListData = action.data;
            break;
        case 'PLATE_ESSENCE_LIST_DATA_LOAD':
            newState.essenceListData = action.data;
            break;
        case 'PLATE_TOPPING_NEWS_LOAD':
            newState.toppingNews = action.data;
            break;
        case 'PLATE_LIST_LOADING':
            newState.refreshState = action.refreshState;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
