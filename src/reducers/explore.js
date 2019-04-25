import {objectAppend} from "../utils";

const defaultState = {
    newsList:[],
    activitiesList:[]
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'EXPLORE_NEWS_LOAD':
            newState.newsList = action.data;
            break;
        case 'EXPLORE_ACTIVITIES_LOAD':
            newState.activitiesList = action.data;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
