/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent,Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
//components
import { Heading2, Heading3, Paragraph } from '../../../components/Text';
import {ActionIcon,Separator} from '../../../components';
//配置
import { screen, system } from '../../../utils'
import { colors } from '../../../config';

type Props = {
    news: Array<string>,
    onMoreIconClicked:Function,
    openState:Boolean,
    onSelected:Function
}


class CommonListHeader extends PureComponent<Props> {
    static defaultProps = {
        onMoreIconClicked:()=>{}
    }
    constructor(props){
        super(props);
    }

    _renderItem = (rowData:any) => {
        const item = rowData.item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[{ backgroundColor:  'white' }, styles.item]}
                onPress={() => this.props.onSelected(item.id)}>
                <ActionIcon name={'ios-notifications'} size={20} color={colors.blue}/>
                <Paragraph style={{ color: 'black',fontSize:14 }}>
                    {item.title}
                </Paragraph>
            </TouchableOpacity>
        )
    };
    renderSeparator = () => {
        return (
            <Separator style={{height:5}}/>
        )
    };

    render() {
        const {news,onMoreIconClicked,openState} = this.props;
        if(news&&news.length)
            return (
                <View style={styles.container}>
                    <FlatList
                        data={news}
                        keyExtractor={(item, index) => index.toString()}
                        style={{marginRight:10}}
                        renderItem={this._renderItem}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.moreItem}
                        onPress={onMoreIconClicked}
                    >
                        {
                          openState?
                                    <Fragment>
                                        <ActionIcon name={'ios-arrow-dropup'} size={15} color={colors.blue}/>
                                        <Text style={{color:colors.blue,fontSize:12}}>收起</Text>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <ActionIcon name={'ios-arrow-dropdown'} size={15} color={colors.blue}/>
                                        <Text style={{color:colors.blue,fontSize:12}}>点击加载更多</Text>
                                    </Fragment>
                        }
                    </TouchableOpacity>
                    <Separator style={{height:5}}/>
                </View>
            );
        else
            return null;
    }
}


const styles = StyleSheet.create({
    container: {
        // height:120,
        width:'100%',
    },
    item: {
        // width: screen.width / 3 - 10,
        height: 30,
        paddingRight:5,
        paddingLeft:10,
        flexDirection:'row',
        alignItems:"center"
    },
    moreItem:{
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'row'
    }
});


export default CommonListHeader
