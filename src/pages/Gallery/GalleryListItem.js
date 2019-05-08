/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native'
//components
import {Heading2, Heading3,Heading4} from '../../components/Text';
import {ActionIcon,ExImage} from '../../components';
//配置
import { screen, system } from '../../utils';
import {colors} from '../../config';

type Props = {
    onPress: Function,
    icon: any,
    title: string,
}


class GalleryListItem extends PureComponent<Props> {
    render() {
        const {info} = this.props;
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}
                              activeOpacity={1}
            >
                <View style={styles.singlePicContent}>
                    <ExImage uri={info.imageUrls[0]} resizeMode='cover' style={styles.pic} />
                    <Heading2 style={{paddingLeft:5}}>{info.title}</Heading2>
                </View>

                <View style={styles.bottomBar}>
                    <View style={styles.topBarLeft}>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}} style={styles.avatar}/>
                        <Heading3 style={{flex:1}}>Moriarty</Heading3>
                    </View>
                    <View style={styles.horPosition}>
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
        marginRight:15,
        marginLeft:15,
        paddingBottom:8,
        backgroundColor:'white',
        borderRadius:10
    },
    bottomBar:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // paddingBottom:5,
        paddingTop:5,
        paddingLeft:5,
        paddingRight:5
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
    singlePicContent:{
        paddingBottom:5,
        flex:1,
        // alignItems:'center'
    },

    content:{
        flex:1,
        marginTop:10,
        marginBottom:5
    },
    pic: {
        width: '100%',
        height: 150,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
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


export default GalleryListItem;
