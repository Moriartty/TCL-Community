/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import { StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation';

import Tab from './pages/MainScreen';

import {colors, theme} from './config';
import DetailsPage from "./pages/DetailsPage";
import Rewards from './pages/Rewards';
// let TopicDetailPage = Platform.OS==='ios'?
    // require('./pages/Plate/TopicDetailPage/index_ios'):require('./pages/Plate/TopicDetailPage/index_android');
import TopicDetailPage from "./pages/Plate/TopicDetailPage";
import SubscribedTags from './pages/SubscribedTags';
import {screen} from "./utils";
import Settings from "./pages/Settings";
import Release from "./pages/Release";

function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}
const lightContentScenes = ['MyTCL'];

type Props = {};
class App extends Component<Props> {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('dark-content');
        // props.platform==='android'? StatusBar.setBackgroundColor(colors.primary):'';
    }

    render() {
        const {platform} = this.props;
        // StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor(colors.primary);
        return (
            <AppContainer
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content');
                                platform==='android'&&StatusBar.setBackgroundColor(colors.blue);
                                // this.props.platform==='android'?StatusBar.setBackgroundColor(colors.blue):'';
                                // StatusBar.setHidden(true)
                            } else {
                                StatusBar.setBarStyle('dark-content');
                                platform==='android'&&StatusBar.setBackgroundColor(colors.primary);
                                // this.props.platform==='android'?StatusBar.setBackgroundColor(colors.primary):'';
                                // StatusBar.setHidden(false)
                            }
                        }
                    }
                }
            />
        )
    }
}



const AppNavigator = createStackNavigator(
    {
        Tab: { screen: Tab },
        DetailsPage: { screen: DetailsPage },
        Rewards:{screen:Rewards},
        TopicDetailPage:{screen:TopicDetailPage},
        SubscribedTags:{screen:SubscribedTags},
        Settings:{screen:Settings},
        Release:{screen:Release}
        // GroupPurchase: { screen: GroupPurchaseScene },
    },
    {
        // headerMode:'none',
        defaultNavigationOptions: {
            headerStyle:{
                borderBottomWidth:screen.onePixel,
                borderBottomColor:colors.gray2,
                shadowOpacity:0,
                elevation: 0,
                height:theme.toolbarHeight
            },
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
);


const AppContainer = createAppContainer(AppNavigator);

App = connect(state=>{
    const {platform} = state['app'];
    return {platform};
},null)(App);

export default App


