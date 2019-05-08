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
//pages
import GalleryListItem from './GalleryListItem';
import GalleryHeaderView from '../Home/ListHeaderView';
//components
import Separator from '../../components/Separator';
//actions
import action from '../../actions/gallery';

type Props = {
    types: Array<string>,
    navigation: any,
}

type State = {
    typeIndex: number,
    data: Array<Object>,
    refreshState: number,
}

class GalleryListScene extends PureComponent<Props,State>{
    constructor(props: Object) {
        super(props);
        this.state = {
            typeIndex: 'tutorials'
        }
    }

    renderCell = (rowData: any) => {
        return (
            <GalleryListItem
                info={rowData.item}
                onPress={() => {
                    // this.props.navigation.navigate('DetailsPage', { info: rowData.item })
                }}
            />
        )
    };

    renderSeparator = () => {
        return (
            <Separator style={{height:10}}/>
        )
    };
    renderHeader = () => {
        return (
            <GalleryHeaderView
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
                numColumns={2}
            />
        )
    }
}

GalleryListScene = connect(state=>{
    const {data,refreshState} = state['gallery'];
    return {data,refreshState};
},dispatch=>({
    requestFirstPage(){
        dispatch(action.loadFirstPage());
    },
    requestNextPage(){
        dispatch(action.loadNextPage());
    }
}))(GalleryListScene);

export default withNavigation(GalleryListScene);
