
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native'
import { Heading2, Heading3, Paragraph } from '../../components/Text'
import { screen, system } from '../../utils'
import { colors } from '../../config';
import ActionIcon from '../../components/ActionIcon';
import RefreshListView from 'react-native-refresh-list-view';

type Props = {
    titles: Array<string>,
    selectedIndex: number,
    onSelected: Function,
}


class ListHeaderView extends PureComponent<Props> {
    static defaultProps = {
        onSelected: () => { },
        onMoreIconClicked:()=>{}
    }
    _renderItem = (rowData:any) => {
        const item = rowData.item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[{ backgroundColor: this.props.selectedIndex == item ? colors.blue : 'white' }, styles.item]}
                onPress={() => this.props.onSelected(i)}>
                <Paragraph style={{ color: this.props.selectedIndex == item ? 'white' : '#555555' }}>
                    {item}
                </Paragraph>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal={true}
                    data={this.props.titles}
                    keyExtractor={(item, index) => index.toString()}
                    style={{marginRight:10}}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator = {false}
                />
                <TouchableOpacity
                    style={styles.moreItem}
                    onPress={this.props.onMoreIconClicked}
                >
                    <ActionIcon name={'ios-more'} size={20}/>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        paddingTop:6,
        paddingBottom:6,
        height:50,
        width:'100%',
        // paddingLeft:10,
        paddingRight:10
    },
    item: {
        // width: screen.width / 3 - 10,
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 6,
        height: 30,
        paddingRight:5,
        paddingLeft:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: screen.onePixel,
        borderColor: colors.border,
    },
    moreItem:{
        flexDirection:"row",
        paddingTop:5,
        paddingBottom:5,
        paddingRight:2,
        paddingLeft:7,
        backgroundColor:'#fff',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default ListHeaderView
