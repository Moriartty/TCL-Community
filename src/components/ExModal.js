import React,{PureComponent} from 'react';
import {View,Modal, ProgressBarAndroid,Text,StyleSheet} from 'react-native';
//配置
import {screen} from '../utils';
import {colors} from '../config';

class ExModal extends PureComponent<Props>{

    render(){
        const {modalVisible,children,onRequestClose} = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onRequestClose}
            >
                <View style={styles.modalContainer}>
                    {children}
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

});

export default ExModal;
