import {RefreshState} from "react-native-refresh-list-view";
let actions = {};

const urls = [
    'https://cdn.pixabay.com/photo/2019/04/15/01/00/rollers-4128215__480.jpg',
    'https://cdn.pixabay.com/photo/2019/04/19/10/14/men-4139026__480.jpg',
    'https://cdn.pixabay.com/photo/2019/04/12/12/52/euro-banknotes-4122079__480.jpg',
    'https://cdn.pixabay.com/photo/2019/04/15/00/00/scarves-4128126__480.jpg',
    'https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299__480.png',
    'https://cdn.pixabay.com/photo/2019/03/03/23/09/open-4033043__480.jpg',
    'https://cdn.pixabay.com/photo/2018/02/16/10/52/beverage-3157395__480.jpg',
    'https://cdn.pixabay.com/photo/2019/03/19/12/24/honesty-4065595__480.jpg'
];

function randomGetPics(){
    const count = parseInt(Math.random()*5+1);
    let imgUrls = [];
    for(let i=0;i<count;i++){
        imgUrls.push(urls[Math.floor(Math.random()*8)])
    }
    return imgUrls;
}

actions.loadData = () => dispatch => {
    dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    setTimeout(function(){
        let mockData = [];
        for(let i=0;i<10;i++){
            mockData.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'GALLERY_LIST_DATA_LOAD',data:mockData});
        dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};
actions.loadFirstPage = () => (dispatch,getState) => {
    dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    setTimeout(function(){
        const preData = getState().trending.data;
        const firstId = preData[0].id;
        let temp = [];

        for(let i=firstId-10;i<firstId;i++){
            temp.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'GALLERY_LIST_DATA_LOAD',data:temp.concat(preData)});
        dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

actions.loadNextPage = () => (dispatch,getState) => {
    dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.FooterRefreshing});
    setTimeout(function(){
        const preData = getState().trending.data;
        const lastId = preData[preData.length-1].id;
        let temp = [];
        for(let i=lastId+1;i<=lastId+10;i++){
            temp.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'GALLERY_LIST_DATA_LOAD',data:preData.concat(temp)});
        dispatch({type:'GALLERY_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

export default actions;
