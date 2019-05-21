import React,{PureComponent} from 'react';
import {
    View, Text, StyleSheet, Platform, TouchableOpacity, InteractionManager, Alert,
    ToastAndroid,ProgressBarAndroid,BackHandler,PanResponder
} from 'react-native';
import {connect} from 'react-redux';
//pages
import Editor from './Editor';
//components
import {ActionIcon,ExModal} from '../../components';
//配置
import {colors} from '../../config';
//actions
import plateAction from '../../actions/plate';
import {screen} from "../../utils";

class Release extends React.Component<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam('title'),
            headerRight:
                <TouchableOpacity onPress={navigation.getParam('handleSubmit',null)} activeOpacity={1} style={{marginRight:15}}>
                    <ActionIcon name={'ios-paper-plane'} size={25} color={'black'}/>
                </TouchableOpacity>,
            headerLeft:
                <TouchableOpacity onPress={navigation.getParam('handleCancel',null)} activeOpacity={1} style={{marginLeft:20}}>
                    <ActionIcon name={'ios-close'} size={35} color={'black'}/>
                </TouchableOpacity>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
        }
    }

    // componentWillMount() {
    //     this._panResponder = PanResponder.create({
    //         onShouldBlockNativeResponder: (evt, gestureState) => {
    //             return true;
    //         },
    //     })
    // }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({'handleSubmit':this.handleSubmit,'handleCancel':this.handleCancel});
            if(Platform.OS=='android')
                BackHandler.addEventListener("hardwareBackPress", this.handleCancel);
        })
    }

    componentWillUnmount() {
        if(Platform.OS=='android')
            BackHandler.removeEventListener("hardwareBackPress", this.handleCancel)
    }

    handleSubmit = () => {
        this.editor.handleSubmit();
        // this.setState({modalVisible:true},()=>{ this.editor.handleSubmit();})
    };

    handleCancel = () => {
        Alert.alert('确定要退出编辑吗？','记录将不会被保存！', [
            {text: '取消', onPress: () => {console.log('Cancel Pressed');return false}, style: 'cancel'},
            {text: '确定', onPress: () =>  {this.props.navigation.goBack();return true}},
        ],);
    };

    onRef = (ref) => {
        this.editor = ref;
    };

    render() {
        return (
            <View style={styles.container}>
                <ExModal modalVisible={this.state.modalVisible}>
                    <View style={styles.modalContent}>
                        <ProgressBarAndroid  color={colors.blue} styleAttr='Inverse'/>
                        <Text>发布中...</Text>
                    </View>
                </ExModal>
                <Editor onRef={this.onRef} navigation={this.props.navigation} handleModalVisible={(val)=>this.setState({'modalVisible':val})}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 20
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

Release = connect(null,dispatch => ({
    releasePlateArticle(title,content,cb){
        dispatch(plateAction.releaseArticle(title,content,cb));
    }
}))(Release);

export default Release;
