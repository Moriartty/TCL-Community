/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native'
//components
import {Heading2, Heading3,Heading4} from '../../../components/Text';
import {ActionIcon,ExImage} from '../../../components';
//配置
import { screen, system } from '../../../utils';
import {colors} from '../../../config';


type Props = {
    onPress: Function,
    icon: any,
    title: string,
    info:Array<Object>
}

function itemWithMultiImg(info){
    return (
        <React.Fragment>
            <View style={styles.multiPicContent}>
                <Text style={styles.title}>{info.title}</Text>
                <View style={{flexDirection:'row'}}>
                    {
                        info.imageUrls.map((o,i,arr)=>{
                            let width = arr.length>=3?(screen.width-42)/3:(screen.width-42)/2;
                            return i<3?<ExImage key={i} uri={o} style={[{width:width,height:width*0.618},styles.pic]} resizeMode={'cover'}/>:null
                        })
                    }
                </View>
                <Text style={styles.content}>{info.content}</Text>
            </View>
        </React.Fragment>
    )
}
function itemWithSingleImg(info){
    return (
        <React.Fragment>
            <View style={styles.singlePicContent}>
                <Text style={styles.title}>{info.title}</Text>
                <ExImage uri={info.imageUrls[0]} resizeMode='contain' style={styles.pic} />
            </View>
            <Text style={styles.content}>{info.content}</Text>
        </React.Fragment>
    )
}
function itemWithNoneImg(info) {
    return (
        <React.Fragment>
            <View style={styles.nonePicContent}>
                <Text style={styles.title}>{info.title}</Text>
                <Text style={styles.content}>{info.content}</Text>
            </View>
        </React.Fragment>
    )
}

function renderItem(info){
    return (
        <React.Fragment>
            <View style={styles.multiPicContent}>
                <Text style={styles.title}>{info.title}</Text>
                {
                    info.imageUrls.length>0?
                        <View style={{flexDirection:'row'}}>
                            {
                                info.imageUrls.map((o,i,arr)=>{
                                    let length = arr.length>3?3:arr.length;
                                    let width = (screen.width-30-4*length)/length;//每张图左右margin为2
                                    return i<3?
                                        <ExImage key={i} uri={o} style={[{width:width,height:width*0.618},styles.pic]} resizeMode={'cover'}/>:null;
                            })
                            }
                        </View>:null
                }
                <Text style={styles.content}>{info.content}</Text>
            </View>
        </React.Fragment>
    )
}


class CommonListItem extends PureComponent<Props> {
    render() {
        const {info} = this.props;
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}
                              activeOpacity={1}
            >
                <View style={styles.bottomBar}>
                    <View style={styles.topBarLeft}>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}} style={styles.avatar}/>
                        <Heading3 style={{flex:1}}>Moriarty</Heading3>
                    </View>
                    {/*<View style={styles.horPosition}>*/}
                        {/*<View style={styles.horPosition}>*/}
                            {/*<ActionIcon name={'ios-chatbubbles'} size={20}/>*/}
                            {/*<Heading4>122</Heading4>*/}
                        {/*</View>*/}
                        {/*<View style={styles.horPosition}>*/}
                            {/*<ActionIcon name={'ios-share'} size={20}/>*/}
                        {/*</View>*/}
                        {/*<View style={styles.horPosition}>*/}
                            {/*<ActionIcon name={'ios-heart'} size={20}/>*/}
                            {/*<Heading4></Heading4>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                </View>
                {
                    renderItem(info)
                    // info.imageUrls.length>1?itemWithMultiImg(info):(info.imageUrls.length==1?itemWithSingleImg(info):itemWithNoneImg(info))
                }


            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width:'100%',
        paddingRight:15,
        paddingLeft:15,
        paddingTop:10,
        paddingBottom:8,
        backgroundColor:'white'
    },
    bottomBar:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:5,
        paddingTop:5
    },
    topBarLeft:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    avatar:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:10
    },
    title:{
        fontSize:18,
        color:'black',
        marginBottom:5
    },
    content:{
        fontSize:14
    },
    nonePicContent:{

    },
    singlePicContent:{
        paddingTop:10,
        paddingBottom:5,
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        // alignItems:'center'
    },
    multiPicContent:{

    },
    content:{
        flex:1,
        marginTop:10,
        marginBottom:5
    },
    pic: {
        borderRadius:5,
        marginRight:5,
        // marginBottom:5,
        margin:2
    },
    horPosition:{
        flexDirection:'row',
        marginLeft:5,
        alignItems:'center',
        // width:50
    }
});


export default CommonListItem;
