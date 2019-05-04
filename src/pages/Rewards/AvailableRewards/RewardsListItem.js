
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native'

import {Heading2, Heading3,Heading4} from '../../../components/Text';
import { screen, system } from '../../../utils';
import {colors} from '../../../config';
import Ionicons from "react-native-vector-icons/Ionicons";
import ActionIcon from '../../../components/ActionIcon';
import ExImage from '../../../components/ExImage';


type Props = {
    onPress: Function,
    icon: any,
    title: string,
}

class RewardsListItem extends PureComponent<Props> {
    render() {
        const {info} = this.props;
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}
                              activeOpacity={1}
            >
                <View style={styles.singlePicContent}>
                    <Heading2>{info.title}</Heading2>
                    <ExImage uri={info.imageUrls[0]} resizeMode='contain' style={styles.pic} />
                </View>

                <View style={styles.bottomBar}>
                    <View style={styles.topBarLeft}>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}} style={styles.avatar}/>
                        <Heading3 style={{flex:1}}>Moriarty</Heading3>
                    </View>
                    <View style={styles.horPosition}>
                        <View style={styles.horPosition}>
                            <ActionIcon name={'ios-chatbubbles'} size={20}/>
                            <Heading4>122</Heading4>
                        </View>
                        <View style={styles.horPosition}>
                            <ActionIcon name={'ios-share'} size={20}/>
                        </View>
                        <View style={styles.horPosition}>
                            <ActionIcon name={'ios-heart'} size={20}/>
                            <Heading4></Heading4>
                        </View>
                    </View>
                </View>
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
        width: screen.width / 3,
        height: 0.618*screen.width / 3,
        borderRadius:10,
        marginRight:5,
        marginBottom:5
    },
    horPosition:{
        flexDirection:'row',
        marginLeft:5,
        alignItems:'center',
        // width:50
    }
});


export default RewardsListItem;
