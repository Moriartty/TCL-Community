
import React, { PureComponent,Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { Heading2, Heading3, Paragraph } from '../../../components/Text'
import { screen, system } from '../../../utils'
import { colors } from '../../../config';
import ActionIcon from '../../../components/ActionIcon';
import RefreshListView from 'react-native-refresh-list-view';
import Separator from '../../../components/Separator';

type Props = {
    news: Array<string>,
    onMoreIconClicked:Function,
    openState:Boolean
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
                onPress={() => this.props.onSelected(i)}>
                <ActionIcon name={'ios-notifications'} size={20} color={'#f5222d'}/>
                <Paragraph style={{ color: 'black',fontSize:14 }}>
                    {item.title}
                </Paragraph>
            </TouchableOpacity>
        )
    }
    renderSeparator = () => {
        return (
            <Separator style={{height:5}}/>
        )
    }

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
                        style={styles.moreItem}
                        onPress={onMoreIconClicked}
                    >
                        {
                          openState?
                                    <Fragment>
                                        <ActionIcon name={'ios-arrow-dropup'} size={15} color={'#f5222d'}/>
                                        <Text style={{color:'#f5222d',fontSize:12}}>收起</Text>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <ActionIcon name={'ios-arrow-dropdown'} size={15} color={'#f5222d'}/>
                                        <Text style={{color:'#f5222d',fontSize:12}}>点击加载更多</Text>
                                    </Fragment>
                        }
                    </TouchableOpacity>
                    <Separator style={{height:5}}/>
                </View>
            )
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
})


export default CommonListHeader
