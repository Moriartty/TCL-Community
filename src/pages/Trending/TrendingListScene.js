/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import {withNavigation} from 'react-navigation';
//components
import {Separator} from '../../components';

//pages
import TrendingListItem from './TrendingListItem';
import TrendingHeaderView from '../Home/ListHeaderView';
//actions
import action from '../../actions/trending';

type Props = {
    types: Array<string>,
    navigation: any,
    data:Array<Object>,
    refreshState:Number
}

type State = {
    typeIndex: number,
}

class TrendingListScene extends PureComponent<Props,State>{
    constructor(props: Object) {
        super(props);
        this.state = {
            typeIndex: 'tutorials'
        }
    }

    renderCell = (rowData: any) => {
        return (
            <TrendingListItem
                info={rowData.item}
                onPress={() => {
                    this.props.navigation.navigate('TopicDetailInfoPage', { info: rowData.item })
                    // this.props.navigation.navigate('DetailsPage', { info: rowData.item })
                }}
            />
        )
    };

    renderSeparator = () => {
        return (
            <Separator style={{height:5}}/>
        )
    };

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
    };

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
            />
        )
    }
}

TrendingListScene = connect(state=>{
    const {data,refreshState} = state['trending'];
    return {data,refreshState};
},dispatch=>({
    requestFirstPage(){
        dispatch(action.loadFirstPage());
    },
    requestNextPage(){
        dispatch(action.loadNextPage());
    }
}))(TrendingListScene);

export default withNavigation(TrendingListScene);
