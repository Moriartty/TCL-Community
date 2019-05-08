/**
 * createdBy Moriarty
 * @flow
 */
//node_modules依赖
import {View, Text, InteractionManager,StyleSheet} from 'react-native';
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
//components
import {ExImage} from '../../components';
//pages
import GalleryListScene from './GalleryListScene';
//config
import {screen} from '../../utils';

import action from '../../actions/gallery';

type Props = {
    tabLabel:string,
    types:Array<string>,
    navigation:Object
}

class Gallery extends PureComponent<Props>{
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }

    render() {
        return (
            <View style={styles.galleryContainer}>
                <GalleryListScene {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    galleryContainer:{
        width:'100%',
        height:'100%',
        paddingTop:0,
    }
});

Gallery = connect(state=>{
    const {data} = state['gallery'];
    return {data};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    }
}))(Gallery);
export default Gallery;
