import React,{PureComponent} from 'react';
import {View, ScrollView, RefreshControl, ToastAndroid, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
//pages
import InfoScene from './InfoScene';
//action
import action from '../../../actions/plate';
import {colors} from "../../../config";
import {screen} from "../../../utils";

class TopicDetailInfoPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return (
            {
                title:'主题详情',
                headerStyle:{
                    //将android和ios标题栏的阴影和分割线去除
                    borderBottomWidth:0,
                    shadowOpacity:0,
                    elevation: 0,
                }
            }
        )
    };

    constructor(props){
        super(props);
        this.state = {
            isRefreshing:false
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }
    render(){
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onHeaderRefresh()}
                        tintColor='gray'
                    />
                }
                style={{width:'100%'}}
            >
                <InfoScene/>
            </ScrollView>
        )
    }
}

TopicDetailInfoPage = connect(null,dispatch=>({
    init(){
        dispatch(action.loadTopicDetail());
    }
}))(TopicDetailInfoPage);

export default TopicDetailInfoPage;
