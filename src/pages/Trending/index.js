import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button,StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList,SafeAreaView,InteractionManager } from 'react-native'
import TrendingListScene from './TrendingListScene';
import action from '../../actions/trending';
// import { Heading2, Heading3, Paragraph } from '../../components/Text'
// import { NavigationItem, SpacingView } from '../../components';
// import {colors} from '../../config';

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
