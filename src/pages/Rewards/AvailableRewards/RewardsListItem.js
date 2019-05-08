/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from 'react-native'
//components
import {Heading2, Heading3,Heading4} from '../../../components/Text';
import {ExImage} from '../../../components';
//配置
import { screen, system } from '../../../utils';
import {colors} from '../../../config';

type Props = {
    onPress: Function,
    icon: any,
    title: string,
    info:Array<Object>
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
                    <ExImage uri={info.imageUrls[0]} resizeMode='cover' style={styles.pic} />
                    <Heading2>{info.title}</Heading2>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        paddingRight:15,
        paddingLeft:15,
        paddingTop:10,
        paddingBottom:8,
        backgroundColor:colors.paper,
    },

    singlePicContent:{
        width:'100%',
        flex:1,

        // alignItems:'center'
    },

    content:{
        flex:1,
        marginTop:10,
        marginBottom:5
    },
    pic: {
        width: screen.width-30,
        height: 150,
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
