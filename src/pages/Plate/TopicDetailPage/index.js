import React,{PureComponent} from 'react';
import {View,Text,Image,ToolbarAndroid,StyleSheet,StatusBar,Button} from 'react-native';
import ExImage from '../../../components/ExImage';
import {colors} from "../../../config";
import {
    AppBarLayout,
    CoordinatorLayout,
    CollapsingToolbarLayout,
    CollapsingParallax,
} from 'react-native-collapsing-toolbar'

import NestedScrollView from 'react-native-nested-scroll-view';
import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {screen} from '../../../utils';

import Trending from '../../Trending';
import Forum from '../../Forum';
import Gallery from '../../Gallery';

import Home from '../../Home';

function getScene(key,props) {
    const compMap = {
        Trending:<Trending {...props}/>,
        Forum:<Forum {...props}/>,
        Gallery:<Gallery {...props}/>
    }
    return compMap[key];
}

class TopicDetailPage extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            // headerStyle:{
            //     backgroundColor:'red',
            // },
            headerMode:'none',
            headerTransparent:true
        }
    }
    constructor(props){
        super(props);
        this.state = {
            curScene:<Trending/>
        }
    }
    render(){
        const {platform,navigation} = this.props;
        let titles = ['Trending', 'Forum', 'Gallery'];
        let types = [
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty'],
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends'],
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends']
        ];
        return (
            <View style={{width:'100%',height:'100%'}}>
                {
                    platform==='android'?
                        <CoordinatorLayout>
                            <AppBarLayout style={{height: 200}}>
                                <CollapsingToolbarLayout
                                    title={navigation.getParam('title')}
                                    contentScrimColor='#ffffff'
                                    expandedTitleColor={colors.blue}
                                    expandedTitleGravity='BOTTOM'
                                    scrimAnimationDuration={500}
                                    expandedTitleMarginStart={22}
                                    expandedTitleMarginBottom={22}
                                    collapsedTitleGravity={'CENTER'}
                                    scrollFlags={
                                        AppBarLayout.SCROLL_FLAG_SCROLL
                                        | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
                                        | AppBarLayout.SCROLL_FLAG_SNAP
                                    }>
                                    <CollapsingParallax parallaxMultiplier={0.6}>
                                        <View collapsable={false} style={{height: 200, justifyContent: 'center' }}>
                                            <ExImage
                                                style={{width:'100%',height:200,opacity:(0,0,0,0.6)}}
                                                uri={'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=583188744,2516998128&fm=15&gp=0.jpg'}
                                                resizeMode={'cover'}
                                            />
                                        </View>
                                    </CollapsingParallax>
                                    <ToolbarAndroid actions={[{title: 'Settings'}]} />
                                </CollapsingToolbarLayout>
                            </AppBarLayout>
                            <NestedScrollView style={{width:'100%',height:'100%'}}>
                                <ScrollableTabView
                                    style={{height:screen.height+100}}
                                    tabBarBackgroundColor='white'
                                    tabBarActiveTextColor={colors.blue}
                                    tabBarInactiveTextColor='#555555'
                                    tabBarTextStyle={styles.tabBarText}
                                    tabBarUnderlineStyle={styles.tabBarUnderline}
                                    // tabBarPosition={'bottom'}
                                    // renderTabBar={() => <DefaultTabBar />}
                                >
                                    {titles.map((title, i) => (
                                        getScene(title,{
                                            tabLabel:titles[i],
                                            key:i,
                                            types:types[i],
                                            navigation:this.props.navigation
                                        })
                                    ))}
                                </ScrollableTabView>
                            </NestedScrollView>
                        </CoordinatorLayout>
                        :
                        ''
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarUnderline: {
        backgroundColor: colors.blue
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
});

TopicDetailPage = connect(state=>{
    const {platform} = state['app'];
    return {platform};
},null)(TopicDetailPage);

export default TopicDetailPage;
