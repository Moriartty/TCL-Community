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
                text:'活出精彩接电话还想继续好<div>还想继续家家</div><img src="https://cdn.pixabay.com/photo/2019/04/15/01/00/rollers-4128215__480.jpg"/><div><b>还想继续家电话</b></div><div><i>不到九点接电话</i></div><div><i><b>好想好想检查</b></i></div><div><ul><li>就吃饭接电话</li><li><b>农村建房金凤凰</b></li><li><i>能吃就行接电话</i></li><li><i><b>继续坚持吃</b></i></li></ul><ol><li>军训</li><li><i>军服</i></li><li><b>红茶加饭酒</b></li><li><b><i>举出你吃鸡翅尖</i></b></li></ol><a href="www.baidu.com">百度</a><b><i><br></i></b></div><img src="https://cdn.pixabay.com/photo/2019/04/19/10/14/men-4139026__480.jpg"/><img src="https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299__480.png"/><img src="https://cdn.pixabay.com/photo/2018/02/16/10/52/beverage-3157395__480.jpg"/>'
            },
            comments:[
                {index:3,device:'移动端',happenTime:new Date().getTime()-312441,name:'Moriarty1',imageUrl:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4',comment:'放水电费第三方'},
                {index:2,device:'小米 mix2',happenTime:new Date().getTime()-310000,name:'Moriarty2',imageUrl:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4',comment:'fuck'},
                {index:1,device:'小米9',happenTime:new Date().getTime()-100000,name:'Moriarty3',imageUrl:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4',comment:'fuck'}
            ]
        };
        dispatch({type:'PLATE_TOPIC_DETAILS_LOAD',topicDetails});
    },0);
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
