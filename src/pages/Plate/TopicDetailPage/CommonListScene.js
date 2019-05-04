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
            typeIndex: 'tutorials',
            headerOpenState:false,
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
    renderHeader = (news) => {
        return (
            <View>
                {
                    this.props.withHeader?
                        <CommonListHeader
                            openState={this.state.headerOpenState}
                            news={news}
                            selectedIndex={this.state.typeIndex}
                            onSelected={(index) => {
                                if (index != this.state.typeIndex) {
                                    this.setState({ typeIndex: index })
                                }
                            }}
                            onMoreIconClicked={()=>{
                                const newOpenState = !this.state.headerOpenState;
                                this.setState({headerOpenState:newOpenState});
                                const count = newOpenState?8:3;
                                this.props.loadToppingNews(count);
                            }}
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
        const {data,refreshState,loadNextData} = this.props;
        return (
            <RefreshListView
                data={data}
                ListHeaderComponent={this.renderHeader.bind(this,this.props.news)}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={this.renderCell}
                keyExtractor={(item, index) => index.toString()}
                refreshState={refreshState}
                // onHeaderRefresh={this.props.requestFirstPage}
                onFooterRefresh={loadNextData}
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