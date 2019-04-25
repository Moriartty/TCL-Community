import {RefreshState} from "react-native-refresh-list-view";
let actions = {};

// actions.loadData = () => dispatch => {
//     dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
//     setTimeout(function(){
//         let mockData = [];
//         for(let i=0;i<10;i++){
//             mockData.push( {id: i, imageUrl: '../../img/test.png', title: 'test'+i})
//         }
//         dispatch({type:'HOME_LIST_DATA_LOAD',data:mockData});
//         dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.Idle});
//     },1000);
// };
// actions.loadFirstPage = () => (dispatch,getState) => {
//     dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
//     setTimeout(function(){
//         const preData = getState().home.data;
//         const firstId = preData[0].id;
//         let temp = [];
//         for(let i=firstId-10;i<firstId;i++){
//             temp.push( {id: i, imageUrl: '../../img/test.png', title: 'test'+i})
//         }
//         dispatch({type:'HOME_LIST_DATA_LOAD',data:temp.concat(preData)});
//         dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.Idle});
//     },1000);
// };
//
// actions.loadNextPage = () => (dispatch,getState) => {
//     dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.FooterRefreshing});
//     setTimeout(function(){
//         const preData = getState().home.data;
//         const lastId = preData[preData.length-1].id;
//         let temp = [];
//         for(let i=lastId+1;i<=lastId+10;i++){
//             temp.push( {id: i, imageUrl: '../../img/test.png', title: 'test'+i})
//         }
//         dispatch({type:'HOME_LIST_DATA_LOAD',data:preData.concat(temp)});
//         dispatch({type:'HOME_LIST_LOADING',refreshState:RefreshState.Idle});
//     },1000);
// };

export default actions;
