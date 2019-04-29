
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { Heading2, Heading3, Paragraph } from '../../../components/Text'
import { screen, system } from '../../../utils'
import { colors } from '../../../config';
import ActionIcon from '../../../components/ActionIcon';
import RefreshListView from 'react-native-refresh-list-view';
import Separator from '../../../components/Separator';

type Props = {
    titles: Array<string>,
    selectedIndex: number,
    onSelected: Function,
}


class CommonListHeader extends PureComponent<Props> {
    static defaultProps = {
        onSelected: () => { },
        onMoreIconClicked:()=>{}
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
        // console.log('title',this.props.titles);
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.titles}
                    keyExtractor={(item, index) => index.toString()}
                    // ItemSeparatorComponent={this.renderSeparator}
                    style={{marginRight:10}}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator = {false}
                />
                <TouchableOpacity
                    style={styles.moreItem}
                    onPress={this.props.onMoreIconClicked}
                >
                    <ActionIcon name={'ios-arrow-dropdown'} size={15} color={'#f5222d'}/>
                    <Text style={{color:'#f5222d',fontSize:12}}>点击加载更多</Text>
                </TouchableOpacity>
                <Separator style={{height:5}}/>
            </View>
        )
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
