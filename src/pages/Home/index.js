/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button,StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList,SafeAreaView,InteractionManager } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';

//components
import {ActionIcon} from '../../components';
//action
import action from '../../actions/home';
//配置
import {colors} from '../../config';
import {screen} from '../../utils';
//pages
import Trending from '../Trending';
import Forum from '../Forum';
import Gallery from '../Gallery';


class Home extends PureComponent<Props>{

    constructor(props){
        super(props);
    }
    // componentDidMount() {
    //     InteractionManager.runAfterInteractions(() => {
    //         this.props.init();
    //     })
    // }
    render() {

        return (
            <SafeAreaView >
                <View style={{height:'100%'}}>
                    <ScrollableTabView
                        style={styles.container}
                        tabBarBackgroundColor='white'
                        tabBarActiveTextColor={colors.blue}
                        tabBarInactiveTextColor='#555555'
                        tabBarTextStyle={styles.tabBarText}
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        // renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}
                    >
                        <Trending
                            tabLabel={'Trending'}
                            types={['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty']}
                            navigation={this.props.navigation}
                        />
                        <Forum
                            tabLabel={'Forum'}
                            types={['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty']}
                            navigation={this.props.navigation}
                        />
                        <Gallery
                            tabLabel={'Gallery'}
                            types={['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty']}
                            navigation={this.props.navigation}
                        />
                    </ScrollableTabView>
                    <ActionButton buttonColor={colors.blue} position='right' verticalOrientation='up'>
                        <ActionButton.Item
                            buttonColor='#ff4d4f'
                            title="Trending"
                            size={45}
                            onPress={() => { this.props.navigation.navigate('Release',{title:'New Trending'})}}>
                            <ActionIcon name="md-create" color={'white'} size={20} style={{marginLeft:4}}/>
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor='#a0d911'
                            title="Gallery"
                            size={45}
                            onPress={() => { this.props.navigation.navigate('Release',{title:'New Photos'})}}>
                            <ActionIcon name="md-photos" color={'white'} size={20} style={{marginLeft:4}}/>
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </SafeAreaView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },
    searchBar: {
        width: screen.width * 0.65,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        alignSelf: 'center',
        marginRight: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: colors.blue
    },
});


Home = connect(state=>{
    const {data} = state['home'];
    return {data};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    }

}))(Home);

export default Home;
