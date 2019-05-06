
import React, { PureComponent } from 'react'
import {
    View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl,
    InteractionManager
} from 'react-native'
import { Heading2, Heading3, Paragraph } from '../../components/Text'
import { screen, system } from '../../utils'
import {  NavigationItem, SpacingView } from '../../components';
import {colors} from '../../config';
import ExImage from '../../components/ExImage';
import ActionIcon from "../../components/ActionIcon";
import Separator from '../../components/Separator'

type Props = {

}

type State = {
    isRefreshing: boolean,
}

class MyTCL extends PureComponent<Props, State> {
    static navigationOptions = ({navigation})=>{
        return {
            // title:navigation.getParam('title',null),
            headerRight:
                <TouchableOpacity onPress={navigation.getParam('handleSettingClick',null)} activeOpacity={1} style={{marginRight:10}}>
                    <ActionIcon name={'ios-settings'} size={25} color={'white'}/>
                </TouchableOpacity>,
            headerStyle:{
                backgroundColor:colors.blue,
                //将android和ios标题栏的阴影和分割线去除
                borderBottomWidth:0,
                shadowOpacity:0,
                elevation: 0,
                height:45
            },
            headerTintColor:colors["headerTintColor"]
        }
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({'handleSettingClick':this.handleSettingClick});
        })
    }

    handleSettingClick = () => {
        this.props.navigation.navigate('Settings');
    }

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true })

        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000)
    }

    renderCell = (title) => {
        return (
            <TouchableOpacity>
                <View style={{flexDirection:'row',padding:15,backgroundColor:colors.primary,justifyContent:'space-between'}}>
                    <Text style={{fontSize:16,color:'black'}}>{title}</Text>
                    <ActionIcon name={'ios-arrow-forward'} size={18}/>
                </View>
                <Separator />
            </TouchableOpacity>
        )
    }

    renderCells = () => {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = this.renderCell(data.title);
                cells.push(cell)
            }
            // cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
            </View>
        )
    }

    renderDeviceList = () => {
        return (
            <View style={{padding:15,backgroundColor:colors.primary}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'black'}}>My Devices</Text>
                    <ActionIcon name={'ios-add'} size={20} color={'black'}/>
                </View>
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flexDirection:'row',marginBottom:10}}>
                    <ExImage uri={'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'} style={styles.avatar}/>
                    {/*<Image style={styles.avatar} source={require('../../img/mine/avatar.png')} />*/}
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Heading2 style={{ color: 'white' }}>Moriarty</Heading2>
                        </View>
                        <Paragraph style={{ color: 'white', marginTop: 4 }}>300 points</Paragraph>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.dataUnit}>
                        <Text style={styles.dataUnit_num}>216</Text>
                        <Text style={styles.dataUnit_text}>Favorites</Text>
                    </View>
                    <View style={styles.dataUnit}>
                        <Text style={styles.dataUnit_num}>8</Text>
                        <Text style={styles.dataUnit_text}>Posts</Text>
                    </View>
                    <View style={styles.dataUnit}>
                        <Text style={styles.dataUnit_num}>203</Text>
                        <Text style={styles.dataUnit_text}>Likes</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.paper,width:'100%',height:'100%' }}>
                {/*<View style={{ position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: colors.blue }} />*/}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    {this.renderDeviceList()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }

    getDataList() {
        return (
            [
                [
                    { title: 'Devices Info' },
                    { title: 'Feedback'},
                    { title: 'FAQ'},
                    { title: 'Customer Support'}
                ]
            ]
        )
    }

}


const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
    header: {
        backgroundColor: colors.blue,
        paddingBottom: 20,
        // flexDirection: 'row',
        // alignItems: 'center',
        padding: 10,
        paddingLeft:15,
        paddingRight:15
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
    dataUnit:{
        width:80
    },
    dataUnit_num:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    dataUnit_text:{
        fontSize:12,
        color:'white'
    }
})


export default MyTCL
