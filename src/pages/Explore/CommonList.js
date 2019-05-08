/**
 * createdBy Moriarty
 * @flow
 */
//node_modules依赖
import React,{PureComponent} from 'react';
import {FlatList, View, StyleSheet, InteractionManager,TouchableOpacity} from 'react-native';
//components
import {Heading3} from "../../components/Text";
import {ActionIcon,ExImage} from '../../components';

type Props = {
    list:Array<Object>,
    topBarAction:Function,
    itemClickAction:Function
}

class CommonList extends PureComponent<Props>{
    constructor(props){
        super(props);
    }

    _renderItem = (rowData: any) => {
        return (
            <TouchableOpacity
                style={styles.exploreListItem}
                activeOpacity={1}
                onPress={this.props.itemClickAction.bind(this,rowData.item.id)}
            >
                <ExImage uri={rowData.item.imgUrl} style={styles.pic}/>
                <Heading3>{rowData.item.title}</Heading3>
            </TouchableOpacity>
        )
    };
    render(){
        const {list,topBarAction} = this.props;
        return (
            <View style={styles.exploreListContainer}>
                <TouchableOpacity
                    style={styles.exploreListHeader}
                    activeOpacity={1}
                    onPress={topBarAction}
                >
                    <Heading3 style={{fontWeight:'bold',marginBottom:5}}>Activities</Heading3>
                    <ActionIcon name={'ios-arrow-forward'} size={20}/>
                </TouchableOpacity>
                <View style={{height:150,width:'100%'}}>
                    <FlatList
                        horizontal={true}
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                        showsHorizontalScrollIndicator = {false}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    exploreListContainer:{
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10
    },
    exploreListHeader:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        height:40,
        width: '100%',
        paddingRight:10
    },
    exploreListItem:{
        width:150,
        // height:250,
    },
    pic:{
        width:120,
        height:120,
        borderRadius:15
    }
});


export default CommonList;
