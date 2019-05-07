import React,{PureComponent} from 'react';
import {View,Text,Image,ToolbarAndroid,StyleSheet,StatusBar,Button,ImageBackground,Platform} from 'react-native';
import ExImage from '../../../components/ExImage';
import {colors,theme} from "../../../config";

import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';
import ActionIcon from '../../../components/ActionIcon'
import {screen} from '../../../utils';
import {SafeAreaView} from 'react-navigation';

import CommonListScene from './CommonListScene';
import {Heading3,Heading4, Paragraph} from "../../../components/Text";
import AppBar_Android from './AppBar_Android';
// const AppBar_Android = Platform.OS==='ios'?null:require('./AppBar_Android');

import action from '../../../actions/plate';


class TopicDetailPage extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            // headerMode:'none',
            headerTransparent:true,
            headerStyle:{
                // paddingTop:StatusBar.currentHeight,
                // height:theme.toolbarHeight,
            }
        }
    }

    constructor(props){
        super(props);
    }

    getScene = (key,props) => {
        const {_loadHottestData,_loadHottestNextPage,
            _loadNewestData,_loadNewestNextPage,
            _loadEssenceData,_loadEssenceNextPage,
            _loadToppingNews,toppingNews,
            hottestListData,newestListData,essenceListData} = this.props;
        const compMap = {
            '热帖':<CommonListScene
                {...props}
                withHeader={true}
                loadData={_loadHottestData}
                loadNextData={_loadHottestNextPage}
                loadToppingNews={_loadToppingNews}
                data={hottestListData}
                news={toppingNews}
            />,
            '最新':<CommonListScene
                {...props}
                loadData={_loadNewestData}
                loadNextData={_loadNewestNextPage}
                data={newestListData}
            />,
            '精华':<CommonListScene
                {...props}
                loadData={_loadEssenceData}
                loadNextData={_loadEssenceNextPage}
                data={essenceListData}
            />
        }
        return compMap[key];
    }

    render(){
        // StatusBar.setHidden(true);
        const {platform,navigation,refreshState} = this.props;
        let titles = ['热帖', '最新', '精华'];
        let types = [
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty'],
        ];
        return (
            <View style={{width:'100%',height:'100%'}}>
                {
                    platform==='android'?
                        <AppBar_Android navigation={navigation}>
                            <ScrollableTabView
                                style={{height:screen.height-30}}
                                tabBarBackgroundColor='white'
                                tabBarActiveTextColor={colors.blue}
                                tabBarInactiveTextColor='#555555'
                                tabBarTextStyle={styles.tabBarText}
                                tabBarUnderlineStyle={styles.tabBarUnderline}
                            >
                                {titles.map((title, i) => (
                                    this.getScene(title,{
                                        tabLabel:titles[i],
                                        key:i,
                                        types:types[i],
                                        navigation:navigation,
                                        refreshState:refreshState
                                    })
                                ))}
                            </ScrollableTabView>
                        </AppBar_Android>
                        :
                        <ScrollableTabView
                            // style={{height:screen.height-30}}
                            tabBarBackgroundColor='white'
                            tabBarActiveTextColor={colors.blue}
                            tabBarInactiveTextColor='#555555'
                            tabBarTextStyle={styles.tabBarText}
                            tabBarUnderlineStyle={styles.tabBarUnderline}
                        >
                            {titles.map((title, i) => (
                                this.getScene(title,{
                                    tabLabel:titles[i],
                                    key:i,
                                    types:types[i],
                                    navigation:navigation,
                                    refreshState:refreshState
                                })
                            ))}
                        </ScrollableTabView>
                }
                <ActionButton
                    buttonColor={colors.blue}
                    onPress={() => { this.props.navigation.navigate('Release')}}
                    renderIcon={() => (
                        <View style={{alignItems:'center'}}>
                            <ActionIcon name="md-create" color={'white'} size={25} style={{marginLeft:4}}/>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: colors.blue,
        height:4,
        width:screen.width/3-60,
        marginLeft:30,
        marginRight:30,
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    }
});

TopicDetailPage = connect(state=>{
    const {platform} = state['app'];
    const {refreshState,hottestListData,newestListData,essenceListData,toppingNews} = state['plate'];
    return {platform,refreshState,hottestListData,newestListData,essenceListData,toppingNews};
},dispatch=>({
    _loadToppingNews(count) {
        dispatch(action.loadToppingNews(count));
    },
    _loadHottestData(){
        dispatch(action.loadHottestData());
    },
    _loadHottestNextPage(){
        dispatch(action.loadHottestNextPage());
    },
    _loadNewestData(){
        dispatch(action.loadNewestData());
    },
    _loadNewestNextPage(){
        dispatch(action.loadNewestNextPage());
    },
    _loadEssenceData(){
        dispatch(action.loadEssenceData());
    },
    _loadEssenceNextPage(){
        dispatch(action.loadEssenceNextPage());
    },
}))(TopicDetailPage);

export default TopicDetailPage;
