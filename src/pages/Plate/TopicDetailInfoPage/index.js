import React,{PureComponent} from 'react';
import {View,ScrollView,RefreshControl} from 'react-native';
//pages
import InfoScene from './InfoScene';

class TopicDetailInfoPage extends React.Component{
    static navigationOptions = ({navigation})=>{
        return (
            {
                title:'主题详情'
            }
        )
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
                style={{padding:10}}
            >
                <InfoScene/>
            </ScrollView>
        )
    }
}

export default TopicDetailInfoPage;
