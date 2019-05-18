import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
//components
import {ExImage,Separator,RichTextView,ImageZoom} from '../../../components';
import {colors} from "../../../config";
//配置
import screen from "../../../utils/screen";

class InfoScene extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalVisible:false
        }
    }
    render(){
        const {topicDetails:info,navigation} = this.props;
        return (
            <View style={{width:'100%',height:'100%'}}>
                <ImageZoom
                    visible={this.state.modalVisible}
                    images={info.content?info.content.images:[]}
                    closeModal={()=>this.setState({modalVisible:false})}
                />
                <View style={styles.header}>
                    <Text style={styles.title}>{info.content?info.content.title:''}</Text>
                    <View style={styles.headerFlex}>
                        <Text style={{fontSize:12}}>16小时前</Text>
                        <Text style={{fontSize:12}}>1290阅读</Text>
                    </View>
                    <View style={styles.headerFlex}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <ExImage uri={info.user?info.user.imageUrl:''} style={styles.avatar}/>
                            <Text style={{fontSize:14,color:'black'}}>{info.user?info.user.name:''}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}>
                            <Text style={styles.attentionIcon}>关注</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Separator style={{backgroundColor:colors.gray2}}/>
                <RichTextView width={'100%'} text={info.content?info.content.text:''}/>
                <Separator style={{height:5}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        padding:10,
        paddingBottom:0
    },
    title:{
        fontSize:18,
        color:'black',
        marginBottom:5
    },
    headerFlex:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:15
    },
    avatar:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:5
    },
    attentionIcon:{
        width:60,
        borderRadius:15,
        borderColor:colors.blue,
        borderWidth:1,
        color:colors.blue,
        height:25,
        lineHeight:25,
        paddingLeft:5,
        paddingRight:5,
        fontSize:12,
        textAlign:'center'
    }
});

InfoScene = connect(state=>{
    const {topicDetails} = state['plate'];
    return {topicDetails}
},dispatch=>({

}))(InfoScene);


export default InfoScene;
