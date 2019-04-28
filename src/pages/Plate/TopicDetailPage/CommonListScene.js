import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {InteractionManager, View} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import CommonListItem from './CommonListItem';
import Separator from '../../../components/Separator';
import {withNavigation} from 'react-navigation';
import TrendingHeaderView from '../../Home/ListHeaderView';
import NestedScrollView from 'react-native-nested-scroll-view';

import action from '../../../actions/trending';

type Props = {
    types: Array<string>,
    navigation: any,
}

type State = {
    typeIndex: number,
    data: Array<Object>,
    refreshState: number,
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
            this.props.init();
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
            <TrendingHeaderView
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index) => {
                    if (index != this.state.typeIndex) {
                        this.setState({ typeIndex: index })
                        // this.requestData()
                    }
                }}
                onMoreIconClicked={()=>{
                    this.props.navigation.navigate('SubscribedTags')
                }}
            />
        )
    }
    renderScroll(props) {
        return (
            <NestedScrollView {...props} />
        )
    }

    render() {
        return (
            <RefreshListView
                data={this.props.data}
                ListHeaderComponent={this.renderHeader}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={this.renderCell}
                keyExtractor={(item, index) => index.toString()}
                refreshState={this.props.refreshState}
                onHeaderRefresh={this.props.requestFirstPage}
                onFooterRefresh={this.props.requestNextPage}
                renderScrollComponent={this.renderScroll}
            />
        )
    }
}

CommonListScene = connect(state=>{
    const {data,refreshState} = state['trending'];
    return {data,refreshState};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    },
    requestFirstPage(){
        dispatch(action.loadFirstPage());
    },
    requestNextPage(){
        dispatch(action.loadNextPage());
    }
}))(CommonListScene);

export default withNavigation(CommonListScene);
