/**
 * createdBy Moriarty
 *
 * @format
 * @flow
 */
//node_modules依赖
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer, TabBarBottom,createSwitchNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
//内部配置依赖
import {colors, theme} from './config';
import {screen} from "./utils";
//pages
import Tab from './pages/MainScreen';
import DetailsPage from "./pages/DetailsPage";
import Rewards from './pages/Rewards';
import TopicDetailPage from "./pages/Plate/TopicDetailPage";
import SubscribedTags from './pages/SubscribedTags';
import Settings from "./pages/Settings";
import Release from "./pages/Release";
import NewsDetail from './pages/NewsDetail';
import ActivitiesDetail from './pages/ActivitiesDetail';
import Login from './pages/Login';
import AuthLoadingScreen from './pages/Login/AuthLoadingScreen';
import SignUp from "./pages/SignUp";

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

type Props = {
    platform:string
};

class App extends Component<Props> {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle('dark-content');
    }

    componentDidMount() {
        SplashScreen.hide();
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
                            } else {
                                StatusBar.setBarStyle('dark-content');
                                platform==='android'&&StatusBar.setBackgroundColor(colors.primary);
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
        Tab1: { screen: Tab },
        DetailsPage: { screen: DetailsPage },
        Rewards:{screen:Rewards},
        TopicDetailPage:{screen:TopicDetailPage},
        SubscribedTags:{screen:SubscribedTags},
        Settings:{screen:Settings},
        Release:{screen:Release},
        NewsDetail:{screen:NewsDetail},
        ActivitiesDetail:{screen:ActivitiesDetail}
    },
    {
        // initialRouteName:'Rewards',
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
const AuthNavigator = createStackNavigator(
    {
        Login:{screen:Login},
        SignUp:{screen:SignUp}
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


const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

App = connect(state=>{
    const {platform} = state['app'];
    return {platform};
},null)(App);

export default App


