/**
 * createdBy Moriarty
 */
//node_modules
import React from 'react';
import {View, TouchableOpacity, Text, InteractionManager,StyleSheet,Image,TextInput,ProgressBarAndroid} from 'react-native';
import {connect} from 'react-redux';

//components
import {ExModal} from '../../components';

//action
import action from '../../actions/login';
//配置
import {colors, theme} from "../../config";
import {screen} from "../../utils";
//pages
import LoginScene from './LoginScene';
import SplashScreen from "react-native-splash-screen";


type Props = {

}



class Login extends React.Component<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            headerRight:
                <TouchableOpacity
                    onPress={()=>navigation.navigate('App')}
                    style={{paddingRight:10}}
                >
                    <Text>Take a Tour</Text>
                </TouchableOpacity>,
            headerStyle:{
                //将android和ios标题栏的阴影和分割线去除
                // borderBottomWidth:screen.onePixel,
                // borderBottomColor:colors.gray2,
                shadowOpacity:0,
                elevation: 0,
                // paddingTop: StatusBar.currentHeight,
                height:theme.toolbarHeight
            }
        }
    };

    constructor(props){
        super(props);

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            SplashScreen.hide();
            this.props.init();
        })
    }
    render(){
        const {modalVisible} = this.props;
        return (
            <View style={{width:'100%',height:'100%'}}>
                <ExModal modalVisible={modalVisible}>
                    <View style={styles.modalContent}>
                        <ProgressBarAndroid  color={colors.blue} styleAttr='Inverse'/>
                        <Text>登录中...</Text>
                    </View>
                </ExModal>
                <LoginScene/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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



Login = connect(state=>{
    const {loading,modalVisible} = state['login'];
    return {loading,modalVisible};
},dispatch=>({
    init(){

    }
}))(Login);

export default Login;


