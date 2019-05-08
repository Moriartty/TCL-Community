/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import {View,Text,StyleSheet} from 'react-native';
import React,{PureComponent} from 'react';
import {SafeAreaView} from 'react-navigation';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
//components
import {Heading3} from "../../components/Text";
import {ActionIcon} from '../../components';
//pages
import AvailableRewards from './AvailableRewards';
import MyRewards from './MyRewards';
//配置
import {colors} from "../../config";
import {screen} from "../../utils";


class Rewards extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            title:'Rewards',
            headerRight:
                    <View style={styles.headerRight}>
                        <ActionIcon name={'ios-gift'} size={20} color={colors.blue} />
                        <Heading3 style={{color:colors.blue,marginLeft:5}}>300</Heading3>
                    </View>
        }
    }
    render(){

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
                        <AvailableRewards
                            tabLabel={'AvailableRewards'}
                            navigation={this.props.navigation}
                        />
                        <MyRewards
                            tabLabel={'MyRewards'}
                            navigation={this.props.navigation}
                        />
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
});

export default Rewards;
