/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import { StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation';

import Tab from './pages/MainScreen';

import {colors} from './config';
import DetailsPage from "./pages/DetailsPage";
import Rewards from './pages/Rewards';

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
const lightContentScenes = [];

type Props = {};
class App extends Component<Props> {
    constructor() {
        super();
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(colors.primary)
    }

    render() {
        return (
            <AppContainer
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content');
                                StatusBar.setBackgroundColor(colors.primary)
                            } else {
                                StatusBar.setBarStyle('dark-content');
                                StatusBar.setBackgroundColor(colors.primary)
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
        Rewards:{screen:Rewards}

        // GroupPurchase: { screen: GroupPurchaseScene },
    },
    {
        // headerMode:'none',
        defaultNavigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default App


