let actions = {};

actions.loadCategoryData = () => dispatch => {
    let mockData = [];
    for(let i=0;i<8;i++){
        let temp = {
            id:i,
            name:'parent-'+i,
            childs:[]
        };
        const childsCount = Math.ceil(Math.random()*4+1);
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

export default actions;
