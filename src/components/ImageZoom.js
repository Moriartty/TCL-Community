import React, {PureComponent, Component} from 'react'
import {View, Modal,Navigator,ActivityIndicator,SafeAreaView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ExModal from './ExModal';


class ImageZoom extends PureComponent{
    constructor(props){
        super(props);
    }


    render() {
        const {visible,images,closeModal,initUrl} = this.props;
        const index = images.findIndex(o=>o.url===initUrl)
        return (
            <Modal
                animationType="fade"
                visible={visible}
                transparent={false}
                hardwareAccelerated={true}
                onRequestClose={closeModal}>
                <ImageViewer
                    imageUrls={images}
                    index={index==-1?0:index}
                    style={{height:'100%',width:'100%',backgroundColor:'black'}}
                    loadingRender={()=><ActivityIndicator/>}
                />
            </Modal>
        )
    }
}

export default ImageZoom;
