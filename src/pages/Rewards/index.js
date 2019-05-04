import {View,Text,StyleSheet} from 'react-native';
import React,{PureComponent} from 'react';
import {SafeAreaView} from 'react-navigation';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import {Heading3} from "../../components/Text";
import Ionicons from "react-native-vector-icons/Ionicons";

import AvailableRewards from './AvailableRewards';
import MyRewards from './MyRewards';
import {colors} from "../../config";
import {screen} from "../../utils";


function getScene(key,props) {
    const compMap = {
        AvailableRewards:<AvailableRewards {...props}/>,
        MyRewards:<MyRewards {...props}/>,
    }
    return compMap[key];
}

class Rewards extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            title:'Rewards',
            headerRight:
                    <View style={styles.headerRight}>
                        <Ionicons name={'ios-gift'} size={20} color={colors.blue} />
                        <Heading3 style={{color:colors.blue,marginLeft:5}}>300</Heading3>
                    </View>
        }
    }
    render(){
        let titles = ['AvailableRewards', 'MyRewards'];
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
                                // types:types[i],
                                navigation:this.props.navigation
                            })
                        ))}
                    </ScrollableTabView>
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
    headerRight:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
    },

    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: colors.blue
    },
})

export default Rewards;
