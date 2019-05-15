import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
//components
import {ExImage} from '../../../components';
import {colors} from "../../../config";

class InfoScene extends React.Component{
    render(){
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>{info.content.title}</Text>
                    <View style={styles.headerFlex}>
                        <Text>16小时前</Text>
                        <Text>1290阅读</Text>
                    </View>
                    <View style={styles.headerFlex}>
                        <ExImage uri={info.user.imageUrl} style={styles.avatar}/>
                        <Text style={styles.attentionIcon}>关注</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{

    },
    headerFlex:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    avatar:{
        width:30,
        height:30,
        borderRadius:15,
    },
    attentionIcon:{
        width:60,
        borderRadius:12,
        borderColor:colors.blue,
        borderWidth:1,
        color:colors.blue,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:5,
        paddingRight:5,
        fontSize:12,
        textAlign:'center'
    }
});

export default InfoScene;
