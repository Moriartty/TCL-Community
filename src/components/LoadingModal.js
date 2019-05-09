import React,{PureComponent} from 'react';
import {View,Modal, ProgressBarAndroid,Text,StyleSheet} from 'react-native';
//配置
import {screen} from '../utils';
import {colors} from '../config';

class LoadingModal extends PureComponent<Props>{

    render(){
        const {modalVisible,loadingState,title} = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ProgressBarAndroid  color={colors.blue} styleAttr='Inverse'/>
                        <Text>{title}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    modalContent:{
        backgroundColor:'white',
        height:150,
        width:screen.width*2/3,
        borderRadius:10,
        padding:20,
        justifyContent:'center',
        alignItems:'center'

    }
});

export default LoadingModal;
