import React, {PureComponent, Component} from 'react'
import {View, Modal,Navigator,ActivityIndicator,SafeAreaView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ExModal from './ExModal';


class ImageZoom extends PureComponent {

    state = {
        index: 0,
    };

    render() {
        const {visible,images,closeModal} = this.props;
        return (
            <Modal
                animationType="fade"
                visible={visible}
                transparent={false}
                hardwareAccelerated={true}
                onRequestClose={closeModal}>
                <ImageViewer
                    imageUrls={images}
                    index={this.state.index}
                    style={{height:'100%',width:'100%',backgroundColor:'black'}}
                    loadingRender={()=><ActivityIndicator/>}
                />
            </Modal>
        )
    }
}

export default ImageZoom;
