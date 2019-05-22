/**
 * createdBy Moriarty
 * 详情页评论
 * @flow
 */
//node_modules
import React,{PureComponent,Component} from 'react';
import {FlatList,View,StyleSheet,Text,TouchableOpacity} from 'react-native';
//配置
import {colors} from '../config';
import {getTimeStamp} from "../utils";
//component
import {Separator,ActionIcon} from '../components';
import ExImage from "./ExImage";

type Props = {
    sortByTime:function,
    sortByHeat:function,
    data:Array<Object>
}
class Comments extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            sortType:'heat'
        }
    }
    _renderItem = (rowData:any) => {
        const item = rowData.item;
        return (
            <View style={{paddingTop:10,paddingBottom:10,flexDirection:'row',width:'100%'}}>
                <View>
                    <ExImage uri={item.imageUrl} style={styles.avatar}/>
                </View>
                <View style={{width:'90%'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={{color:'black'}}>{item.name}</Text>
                        <ActionIcon name={'ios-heart-empty'} size={20}/>
                    </View>
                    <Text style={{fontSize:10}}>{item.index}# {getTimeStamp(new Date().getTime(),item.happenTime)} 来自 {item.device}</Text>
                    <Text style={{color:'black',fontSize:16,marginTop:10}}>{item.comment}</Text>
                </View>
            </View>
        )
    }
    _renderSeparator = () => {
        return (
            <Separator style={{backgroundColor:colors.gray2}}/>
        )
    };
    render(){
        const {sortByTime,sortByHeat,data} = this.props;
        return (
            <View style={{paddingRight:10,paddingLeft:10}}>
                <View style={styles.header}>
                    <Text style={{color:'black',fontWeight:'bold'}}>全部评论</Text>
                    <View style={{flexDirection:'row',width:80,justifyContent:'space-around'}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={()=>{this.setState({sortType:'heat'});sortByHeat()}}
                        >
                            <Text style={{color:this.state.sortType==='heat'?'black':colors.gray2}}>热度</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={()=>{this.setState({sortType:'time'});sortByTime()}}
                        >
                            <Text style={{color:this.state.sortType==='time'?'black':colors.gray2}}>时间</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height:60,
        justifyContent:'space-between',
        alignItems:'center'

    },
    avatar:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:5
    },
});

export default Comments;
