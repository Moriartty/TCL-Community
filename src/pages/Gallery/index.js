import {View, Text, InteractionManager,StyleSheet} from 'react-native';
import React from 'react';
import ExImage from '../../components/ExImage';
import GalleryListScene from './GalleryListScene';
import {screen} from '../../utils';
import {connect} from 'react-redux';
import action from '../../actions/gallery';


class Gallery extends React.PureComponent<Props>{
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
})

Gallery = connect(state=>{
    const {data} = state['gallery'];
    return {data};
},dispatch=>({
    init(){
        dispatch(action.loadData());
    }
}))(Gallery);
export default Gallery;
