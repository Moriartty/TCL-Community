import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button,StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList,SafeAreaView,InteractionManager } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';
import ActionIcon from '../../components/ActionIcon';
import action from '../../actions/home';
// import {SafeAreaView} from 'react-navigation';
// import { Heading2, Heading3, Paragraph } from '../../components/Text'
// import { NavigationItem, SpacingView } from '../../components';
import {colors} from '../../config';
import {screen} from '../../utils';

import Trending from '../Trending';
import Forum from '../Forum';
import Gallery from '../Gallery';

function getScene(key,props) {
    const compMap = {
        Trending:<Trending {...props}/>,
        Forum:<Forum {...props}/>,
        Gallery:<Gallery {...props}/>
    }
    return compMap[key];
}

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
        let titles = ['Trending', 'Forum','Gallery'];
        let types = [
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends','moriarty'],
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends'],
            ['tutorials', 'Unboxing', 'T1 pro', 'App Recommends']
        ];


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
                        {titles.map((title, i) => (
                            getScene(title,{
                                tabLabel:titles[i],
                                key:i,
                                types:types[i],
                                navigation:this.props.navigation
                            })
                        ))}
                    </ScrollableTabView>
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
})

// const styles = StyleSheet.create({
//     homeContainer:{
//         width:'100%',
//         height:'100%',
//         paddingTop:0,
//     }
// });

Home = connect(state=>{
    const {data} = state['home'];
    return {data};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    }

}))(Home);

export default Home;
