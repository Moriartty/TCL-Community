/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react'
import {
    View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions, StackActions,SwitchActions} from "react-navigation";
//配置
import {colors} from '../../config';
//components
import {ExImage,ActionIcon,Separator} from '../../components';
//action
import loginAction from '../../actions/login';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AuthLoading' })],
});

class Setting extends PureComponent<Props>{
    static navigationOptions = ({navigation})=>{
        return {
            title:'Settings',
        }
    };
    renderCard = () => {
        return (
            <View style={styles.cardContainer}>
                <View style={{flexDirection:'row', width:'100%',justifyContent:'flex-end'}}>
                    <ActionIcon name={'ios-brush'} color={'black'} size={20}/>
                </View>
                <ExImage uri={'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'} style={styles.avatar}/>
                <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Moriarty</Text>
                <Text style={{color:'black'}}>bing-chen@tcl.com</Text>
            </View>
        )
    }
    renderCell = () => {
        let cells = [];
        let dataList = this.getDataList();

        return (
            <View style={{ flex: 1 }}>
                {
                    dataList.map((sub,i)=>{
                        return (
                            <View style={{marginBottom:30}} key={sub.section}>
                                <View><Text>{sub.section}</Text></View>
                                {
                                    sub.list.map((item,i)=>{
                                        return (
                                            <TouchableOpacity key={i}>
                                                <View style={{paddingTop:15,paddingBottom:15}}>
                                                    {
                                                        item.customRender
                                                    }
                                                    <View>
                                                        <Text style={{color:'black'}}>{item.itemTitle}</Text>
                                                    </View>
                                                </View>
                                                <Separator/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    render(){
        return (
            <View style={{ flex: 1,width:'100%',height:'100%',paddingTop:10 }}>
                {/*<View style={{ position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: colors.blue }} />*/}
                <ScrollView
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.isRefreshing}
                    //         onRefresh={() => this.onHeaderRefresh()}
                    //         tintColor='gray'
                    //     />
                    // }
                    style={{padding:10}}
                >
                    {this.renderCell()}
                    <View style={{alignItems:'center',marginBottom:40}}>
                        <TouchableOpacity style={styles.logout} onPress={this.handleLogout}>
                            <Text style={{color:'black'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    handleLogout = () => {
        // this.props.logout(this.props.navigation.dispatch.bind(this,SwitchActions.jumpTo({ routeName:'AuthLoading' })));
        this.props.logout(this.props.navigation.navigate.bind(this,'AuthLoading',{isLogout:true}))
        // this.props.logout(this.props.navigation.dispatch.bind(this,resetAction));
    }

    getDataList = () => {
        return [
            {
                section:'TCL Account',
                list:[
                    {itemTitle:'Account Info',customRender:this.renderCard()},
                    {itemTitle:'Password & Security'},
                ]
            },
            {
                section:'Alcatel TCL Community',
                list:[
                    {itemTitle:'App Version'},
                    {itemTitle:'Check Updates'},
                    {itemTitle:'Privacy Policy'},
                    {itemTitle:'Term & Conditions'},
                ]
            }
        ]
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        borderWidth:1,
        borderColor:colors.gray2,
        borderRadius:10,
        width:'100%',
        padding:10,
        marginBottom:5,
        alignItems:'center',
        justifyContent:'center'
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:30,
        borderColor:'black',
        borderWidth:1
    },
    logout:{
        backgroundColor:colors.gray2,
        width:100,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    }
});

Setting = connect(null,dispatch=>({
    logout(cb){
        dispatch(loginAction.logout(cb));
    }
}))(Setting);

export default Setting;
