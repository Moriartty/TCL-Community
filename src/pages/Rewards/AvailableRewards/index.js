/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React,{PureComponent} from 'react';
import {View, FlatList, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
//pages
import RewardsListScene from './RewardsListScene';
//actions
import action from '../../../actions/rewards';

class AvailableRewards extends PureComponent<Props>{
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }

    render(){
        return (
            <View>
                <RewardsListScene/>
            </View>
        )
    }
}
AvailableRewards = connect(state=>{
    const {availableRewards} = state['rewards'];
    return {availableRewards};
},dispatch => ({
    init(){
        dispatch(action.loadAvailableRewards())
    }
}))(AvailableRewards);

export default AvailableRewards;
