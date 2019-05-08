/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button,StyleSheet,InteractionManager } from 'react-native';
//pages
import TrendingListScene from './TrendingListScene';
//actions
import action from '../../actions/trending';

type Props = {
    tabLabel:string,
    types:Array<string>,
    navigation:Object
}

class Trending extends PureComponent<Props>{
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }

    render(){
        return (
            <View style={styles.trendingContainer}>
                <TrendingListScene {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    trendingContainer:{
        width:'100%',
        height:'100%',
        paddingTop:0,
    }
});

Trending = connect(state=>{
    const {data} = state['trending'];
    return {data};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    }

}))(Trending);

export default Trending;
