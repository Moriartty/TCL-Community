/**
 * createdBy Moriarty
 */
//node_modules
import React from 'react';
import {View, TouchableOpacity, Text, InteractionManager,StyleSheet,Image,TextInput,StatusBar} from 'react-native';
import {connect} from 'react-redux';


//components
import {LoadingModal} from '../../components';

//action
import action from '../../actions/login';
//配置
import {colors, theme} from "../../config";
import {screen} from "../../utils";
//pages
import LoginScene from './LoginScene';


type Props = {

}

async function test(cb){
    const token = await global.storage.load({
        key:'token'
    });
    console.log('token',token);
    if(token)
        cb();
}


class Login extends React.Component<Props,State>{
    static navigationOptions = ({navigation}) => {
        return {
            headerRight:
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Tab')}
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

    componentWillMount() {
        global.storage.load({
            key:'token'
        }).then(token=>{
            token&&this.props.navigation.navigate.bind(this,'Tab');
        }).catch(err=>{
            console.log(err);
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }
    render(){
        const {loadingState,modalVisible} = this.props;
        return (
            <React.Fragment>
                <LoadingModal loadingState={loadingState} modalVisible={modalVisible} title={'登录中...'}/>
                <LoginScene/>
            </React.Fragment>
        )
    }
}



Login = connect(state=>{
    const {loading,modalVisible} = state['login'];
    return {loading,modalVisible};
},dispatch=>({
    init(){

    }
}))(Login);

export default Login;


