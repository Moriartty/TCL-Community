
let actions = {};

actions.loadNewsData = () => dispatch => {
    const mockData = [
        {title:'aaaaaaaaaaaa',imgUrl:'https://cdn.pixabay.com/photo/2019/04/15/01/00/rollers-4128215__480.jpg'},
        {title:'bbbbbbbbbbb',imgUrl:'https://cdn.pixabay.com/photo/2019/04/19/10/14/men-4139026__480.jpg'},
        {title:'cccccccccccc',imgUrl:'https://cdn.pixabay.com/photo/2019/04/12/12/52/euro-banknotes-4122079__480.jpg'},
        {title:'dddddddddddd',imgUrl:'https://cdn.pixabay.com/photo/2019/04/15/00/00/scarves-4128126__480.jpg'}
    ];
    dispatch({type:'EXPLORE_NEWS_LOAD',data:mockData});
};
actions.loadActivitiesData = () => dispatch => {
    const mockData = [
        {title:'aaaaaaaaaaaa',imgUrl:'https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299__480.png'},
        {title:'bbbbbbbbbbb',imgUrl:'https://cdn.pixabay.com/photo/2019/03/03/23/09/open-4033043__480.jpg'},
        {title:'cccccccccccc',imgUrl:'https://cdn.pixabay.com/photo/2018/02/16/10/52/beverage-3157395__480.jpg'},
        {title:'dddddddddddd',imgUrl:'https://cdn.pixabay.com/photo/2019/03/19/12/24/honesty-4065595__480.jpg'}
    ];
    dispatch({type:'EXPLORE_ACTIVITIES_LOAD',data:mockData});
};

export default actions;
