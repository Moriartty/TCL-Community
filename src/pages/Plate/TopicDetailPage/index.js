/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React,{PureComponent} from 'react';
import {View,Text,Image,ToolbarAndroid,StyleSheet,Platform} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';
//配置
import {colors,theme} from "../../../config";
import {screen} from '../../../utils';
//components
import {ActionIcon} from '../../../components'
//pages
import CommonListScene from './CommonListScene';
const AppBar_Android = Platform.OS==='ios'?'':require('./AppBar_Android');
//actions
import action from '../../../actions/plate';

type Props = {
    navigation:Object,
    platform:string,
    refreshState:number,
    hottestListData:Array<Object>,
    newestListData:Array<Object>,
    essenceListData:Array<Object>,
    toppingNews:Array<Object>,
    _loadHottestData:Function,
    _loadHottestNextPage:Function,
    _loadNewestData:Function,
    _loadNewestNextPage:Function,
    _loadEssenceData:Function,
    _loadEssenceNextPage:Function,
    _loadToppingNews:Function
}

class TopicDetailPage extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            headerTransparent:true,
            headerStyle:{
                // paddingTop:StatusBar.currentHeight,
                // height:theme.toolbarHeight,
            }
        }
    };

    constructor(props){
        super(props);
    }


    render(){
        // StatusBar.setHidden(true);
        const {platform,navigation,refreshState,_loadHottestData,_loadHottestNextPage,
            _loadNewestData,_loadNewestNextPage, _loadEssenceData,_loadEssenceNextPage,
            _loadToppingNews,toppingNews, hottestListData,newestListData,essenceListData} = this.props;

        let pages = [
            <CommonListScene
                tabLabel={'热帖'}
                navigation={navigation}
                refreshState={refreshState}
                withHeader={true}
                loadData={_loadHottestData}
                loadNextData={_loadHottestNextPage}
                loadToppingNews={_loadToppingNews}
                data={hottestListData}
                news={toppingNews}
            />,
            <CommonListScene
                tabLabel={'最新'}
                navigation={navigation}
                refreshState={refreshState}
                loadData={_loadNewestData}
                loadNextData={_loadNewestNextPage}
                data={newestListData}
            />,
            <CommonListScene
                tabLabel={'精华'}
                navigation={navigation}
                refreshState={refreshState}
                loadData={_loadEssenceData}
                loadNextData={_loadEssenceNextPage}
                data={essenceListData}
            />
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
                                {React.Children.map(pages,(o)=>o)}
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
                            {React.Children.map(pages,(o)=>o)}
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
        height:2,
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
    _loadHottestData(opt){
        dispatch(action.loadHottestData(opt));
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
