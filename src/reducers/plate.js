import {objectAppend} from "../utils";

const defaultState = {
    categoryList:[]
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'PLATE_CATEGORY_LIST_LOAD':
            newState.categoryList = action.data;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
