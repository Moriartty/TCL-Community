import {objectAppend} from "../utils";

const defaultState = {
    loading:false,
    modalVisible:false
};

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case "LOGIN_LOADING":
            newState.loading = action.loading;
        case "LOGIN_MODAL_VISIBLE":
            newState.modalVisible = action.visible;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}
