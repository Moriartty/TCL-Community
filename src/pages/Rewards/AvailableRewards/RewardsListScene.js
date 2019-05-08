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
import {Separator} from '../../../components';
//pages
import RewardsListItem from './RewardsListItem';
//actions
import action from '../../../actions/rewards';

type Props = {
    types: Array<string>,
    navigation: any,
    data: Array<Object>,
    refreshState: number,
    requestNextPage:Function,
    requestFirstPage:Function
}

type State = {
    typeIndex: string,
}

class RewardsListScene extends PureComponent<Props,State>{
    constructor(props: Object) {
        super(props);
        this.state = {
            typeIndex: 'tutorials'
        }
    }

    renderCell = (rowData: any) => {
        return (
            <RewardsListItem
                info={rowData.item}
                onPress={() => {
                    // this.props.navigation.navigate('DetailsPage', { info: rowData.item })
                }}
            />
        )
    }

    renderSeparator = () => {
        return (
            <Separator style={{height:5}}/>
        )
    }
    // renderHeader = () => {
    //     return (
    //         <TrendingHeaderView
    //             titles={this.props.types}
    //             selectedIndex={this.state.typeIndex}
    //             onSelected={(index) => {
    //                 if (index != this.state.typeIndex) {
    //                     this.setState({ typeIndex: index })
    //                     // this.requestData()
    //                 }
    //             }}
    //             onMoreIconClicked={()=>{
    //                 this.props.navigation.navigate('SubscribedTags')
    //             }}
    //         />
    //     )
    // }

    render() {
        return (
            <RefreshListView
                data={this.props.availableRewards}
                // ListHeaderComponent={this.renderHeader}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={this.renderCell}
                keyExtractor={(item, index) => index.toString()}
                refreshState={this.props.refreshState}
                onHeaderRefresh={this.props.requestFirstPage}
                onFooterRefresh={this.props.requestNextPage}
                // renderScrollComponent={this.renderScroll}
            />
        )
    }
}

RewardsListScene = connect(state=>{
    const {availableRewards,refreshState} = state['rewards'];
    return {availableRewards,refreshState};
},dispatch=>({
    requestFirstPage(){
        dispatch(action.loadFirstPage());
    },
    requestNextPage(){
        dispatch(action.loadNextPage());
    }
}))(RewardsListScene);

export default withNavigation(RewardsListScene);
