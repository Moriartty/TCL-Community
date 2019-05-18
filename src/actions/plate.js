import {RefreshState} from "react-native-refresh-list-view";
import {get, post, postFile, put} from '../utils/fetch';
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
    const count = parseInt(Math.random()*4);
    let imgUrls = [];
    for(let i=0;i<count;i++){
        imgUrls.push(urls[Math.floor(Math.random()*8)])
    }
    return imgUrls;
}

function getData(i){
    return {
        id:i,
        imageUrls:randomGetPics(),
        title:'测试测试测试测试'+i,
        content:'发斯蒂芬斯蒂芬斯蒂芬发送到发斯蒂芬是否还能发一个还是带个',
        happenTime:new Date().getTime()
    }
}

actions.loadHottestData = (opt) => dispatch => {
    dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.HeaderRefreshing});
    get(API.GET_ARTICLE,{}).then((resp)=>{
        if(resp.error){
            opt.error(resp);
            let mockData = [];
            for(let i=0;i<10;i++){
                mockData.push( getData(i))
            }
            dispatch({type:'PLATE_HOTTEST_LIST_DATA_LOAD',data:mockData});
            dispatch({type:'PLATE_LIST_LOADING',refreshState:RefreshState.Idle});
        }
        else{
            console.log(API.GET_ARTICLE,resp.data);
            let mockData = [];
            for(let i=0;i<10;i++){
                mockData.push( getData(i))
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
            temp.push( getData(i))
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
            mockData.push( getData(i))
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
            temp.push( getData(i))
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
            mockData.push( getData(i))
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
            temp.push( getData(i))
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

actions.loadTopicDetail = () => dispatch => {
    setTimeout(function(){
        const topicDetails = {
            user:{
                name:'moriarty',
                imageUrl:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'
            },
            content:{
                title:'今天是个好日子',
                images:urls.map(o=>{return {url:o}}),
                text:'半醒半睡难受<div>还想继续你到哪</div><div>记得记得你到哪就像你想你</div><div>会想你的你到哪<b>不行不行补习班</b></div><div><b>不想教学计划<i>还想继续家</i></b></div><div><ul><li><b style="font-size: 1em;"><i>不像你想你好</i></b><br></li></ul><b style="font-size: 1em;"><i>那些那些那些</i></b><br></div><div><b style="font-size: 1em;"><i>建筑机械好</i></b></div>'
            }
        };
        dispatch({type:'PLATE_TOPIC_DETAILS_LOAD',topicDetails});
    },2000);
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
actions.uploadPics = (file,success,failed) => dispatch => {
    console.log(file);
    let formData = new FormData();
    formData.append('file',file);
    put(API.FILE_UPLOADER,formData).then((resp)=>{
        console.log(resp);
        resp.error?failed(resp):success(resp);
    })
};


export default actions;
