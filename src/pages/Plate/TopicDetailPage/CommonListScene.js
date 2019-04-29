import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {InteractionManager, View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import CommonListItem from './CommonListItem';
import Separator from '../../../components/Separator';
import {withNavigation} from 'react-navigation';
import CommonListHeader from './CommonListHeader';
import NestedScrollView from 'react-native-nested-scroll-view';


type Props = {
    types: Array<string>,
    navigation: any,
    withHeader:Boolean,
    loadData:Function,
    loadNextData:Function,
    data:Array<Object>
}

type State = {
    typeIndex: number,
}

class CommonListScene extends PureComponent<Props,State>{
    constructor(props: Object) {
        super(props);
        this.state = {
            typeIndex: 'tutorials'
        }
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.loadData();
            if(this.props.withHeader)
                this.props.loadToppingNews(3);
        })
    }

    renderCell = (rowData: any) => {
        return (
            <CommonListItem
                info={rowData.item}
                onPress={() => {
                    this.props.navigation.navigate('DetailsPage', { info: rowData.item })
                }}
            />
        )
    }

    renderSeparator = () => {
        return (
            <Separator style={{height:5}}/>
        )
    }
    renderHeader = () => {
        return (
            <View>
                {
                    this.props.withHeader?
                        <CommonListHeader
                            titles={this.props.news}
                            selectedIndex={this.state.typeIndex}
                            onSelected={(index) => {
                                if (index != this.state.typeIndex) {
                                    this.setState({ typeIndex: index })
                                }
                            }}
                            onMoreIconClicked={()=>{this.props.loadToppingNews(8)}}
                        />:null
                }
                {
                    this.props.refreshState === 1?
                        <View style={styles.footerContainer} >
                            <ActivityIndicator size="small" color="#888888" />
                            <Text style={[styles.footerText, {marginLeft: 7}]}>数据加载中...</Text>
                        </View>:null
                }

            </View>
        )
    }
    renderScroll(props) {
        return (
            <NestedScrollView {...props} />
        )
    }

    render() {
        const {withHeader} = this.props;
        return (
            <RefreshListView
                data={this.props.data}
                ListHeaderComponent={this.renderHeader.bind(this.props.news)}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={this.renderCell}
                keyExtractor={(item, index) => index.toString()}
                refreshState={this.props.refreshState}
                // onHeaderRefresh={this.props.requestFirstPage}
                onFooterRefresh={this.props.loadNextData}
                renderScrollComponent={this.renderScroll}
            />
        )
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
});

export default withNavigation(CommonListScene);
