import {RefreshState} from "react-native-refresh-list-view";
import {get,post} from '../utils/fetch';
import API from '../config/api';

let actions = {};

actions.loadCategoryData = () => dispatch => {
    let mockData = [];
    for(let i=0;i<10;i++){
        let temp = {
            id:i,
            name:'parent-'+i,
            childs:[]
        };
        const childsCount = Math.ceil(Math.random()*8+1);
        for(let i=0;i<childsCount;i++){
            temp.childs.push({
                title:'child-'+i,
                subTitle:'subTitle-'+i
            });
        }
        mockData.push(temp);
    }
    dispatch({type:'PLATE_CATEGORY_LIST_LOAD',data:mockData})
}


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
    const count = parseInt(Math.random()*5);
    let imgUrls = [];
    for(let i=0;i<count;i++){
        imgUrls.push(urls[Math.floor(Math.random()*8)])
    }
    return imgUrls;
}

actions.loadHottestData = (opt) => dispatch => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    get(API.GET_ARTICLE,{},{timeout:1000*10}).then((resp)=>{
        if(resp.error)
            opt.error(resp);
        else{
            let mockData = [];
            for(let i=0;i<10;i++){
                mockData.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
            }
            dispatch({type:'PLATE_HOTTEST_LIST_DATA_LOAD',data:mockData});
            dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
        }
    });
};

actions.loadHottestNextPage = () => (dispatch,getState) => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.FooterRefreshing});
    setTimeout(function(){
        const preData = getState().plate.hottestListData;
        const lastId = preData[preData.length-1].id;
        let temp = [];
        for(let i=lastId+1;i<=lastId+10;i++){
            temp.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'PLATE_HOTTEST_LIST_DATA_LOAD',data:preData.concat(temp)});
        dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

actions.loadNewestData = () => dispatch => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    setTimeout(function(){
        let mockData = [];
        for(let i=0;i<10;i++){
            mockData.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'PLATE_NEWEST_LIST_DATA_LOAD',data:mockData});
        dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

actions.loadNewestNextPage = () => (dispatch,getState) => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.FooterRefreshing});
    setTimeout(function(){
        const preData = getState().plate.newestListData;
        const lastId = preData[preData.length-1].id;
        let temp = [];
        for(let i=lastId+1;i<=lastId+10;i++){
            temp.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'PLATE_NEWEST_LIST_DATA_LOAD',data:preData.concat(temp)});
        dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};
actions.loadEssenceData = () => dispatch => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    setTimeout(function(){
        let mockData = [];
        for(let i=0;i<10;i++){
            mockData.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'PLATE_ESSENCE_LIST_DATA_LOAD',data:mockData});
        dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

actions.loadEssenceNextPage = () => (dispatch,getState) => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.FooterRefreshing});
    setTimeout(function(){
        const preData = getState().plate.essenceListData;
        const lastId = preData[preData.length-1].id;
        let temp = [];
        for(let i=lastId+1;i<=lastId+10;i++){
            temp.push( {id: i, imageUrls: randomGetPics(), title: 'winter is coming'+i})
        }
        dispatch({type:'PLATE_ESSENCE_LIST_DATA_LOAD',data:preData.concat(temp)});
        dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
    },1000);
};

actions.loadToppingNews = (count) => dispatch => {
    let mockData = [];
    for(let i=0;i<count;i++){
        mockData.push({id:i,title:i+'陈冰今天减肥了没？'})
    }
    dispatch({type:'PLATE_TOPPING_NEWS_LOAD',data:mockData});
};

/**
 * 发布一篇文章
 * @param title
 * @param content
 * @param cb
 * @returns {function(*)}
 */
actions.releaseArticle = (title,content,success,failed) => dispatch => {
    const params = {
            articleTitle:title,
            content:content
        };
    post(API.RELEASE_ARTICLE, params).then((resp)=>{
        resp.error? failed(resp):success(resp);
    });
};
actions.uploadPics = () => dispatch => {

}


export default actions;
