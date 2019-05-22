import React from 'react';
import {View, TouchableOpacity, Text, InteractionManager,StyleSheet,Image,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';
import {BoxShadow} from 'react-native-shadow';
//components
import {ExImage,CustomButton,ActionIcon,ExInput} from '../../components';
//action
import action from '../../actions/login';
//配置
import {colors, theme} from "../../config";
import {screen} from "../../utils";

type State = {
    account:string,
    pwd:string
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
});

class LoginScene extends React.Component<State>{

    constructor(props){
        super(props);
        this.state = {
            account:'',
            pwd:''
        }
    }

    handleLogin = () => {
        const {account,pwd} = this.state;
        //登录成功后，进入主页面并重置路由，保证应用退出后不会再返回登录页,这里不进入loading页，直接进入App
        // this.props.login(account,pwd,this.props.navigation.dispatch.bind(this,resetAction));
        // this.props.login(account,pwd,this.props.navigation.navigate.bind(this,'AuthLoading'));
        this.props.login(account,pwd,this.props.navigation.navigate.bind(this,'App'));

    };


    render(){
        return (
            <View style={styles.loginContainer}>
                <View style={{height:'60%'}}>
                    <View style={styles.content1}>
                        <Image source={require('../../img/ic_launcher.png')} resizeMode={'cover'} style={styles.topIcon}/>
                        <Text style={styles.topText}>Welcome to TCL Community</Text>
                    </View>
                    <View style={styles.content2}>
                        <ExInput
                            width={screen.width-60}
                            height={45}
                            placeholder={'EMAIL OR PHONE'}
                            _onChangeText={(account) => this.setState({account})}
                            val={this.state.account}
                        />
                        <ExInput
                            width={screen.width-60}
                            height={45}
                            placeholder={'PASSWORD'}
                            _onChangeText={(pwd) => this.setState({pwd})}
                            val={this.state.pwd}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width:'100%',
                                flexDirection:'row',
                                justifyContent:'flex-end',
                                marginBottom:20
                            }}
                        >
                            <Text style={{fontSize:12}}>Forget Password?</Text>
                        </TouchableOpacity>
                        <BoxShadow setting={loginBtnShadow}>
                        <CustomButton title={'LOGIN'} style={styles.loginButton} titleStyle={{color:'black'}} onPress={this.handleLogin}/>
                        </BoxShadow>
                    </View>
                </View>
                <View style={{height:'40%',justifyContent:'flex-end'}}>
                    <View style={styles.content3}>
                        <Text style={{color:'black',fontSize:14}}>Or Login With</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:200}}>
                            <ActionIcon name={'logo-facebook'} size={45}/>
                            <ActionIcon name={'logo-twitter'} size={45}/>
                            <ActionIcon name={'logo-google'} size={45}/>
                        </View>
                    </View>
                    <View style={styles.content4}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('SignUp')}
                        >
                            <Text style={{color:colors.blue}}>Not a member? SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const loginBtnShadow = {
    height: 40,
    width:100,
    color:"#bfbfbf",
    border:2,
    radius:20,
    opacity:0.3,
    x:0,
    y:0,
    style:{marginVertical:5}
}

const styles = StyleSheet.create({
    loginContainer:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        padding:30,
    },
    content1:{
        alignItems:'center',
        marginBottom:30
    },
    content2:{
        alignItems:'center',
        // marginBottom:200
    },
    content3:{
        alignItems:'center',
        width:'100%',
        height:80,
        justifyContent:"space-between",
        marginBottom:50
    },
    content4:{
        alignItems:'center'
    },
    topIcon:{
        width:80,
        height:80,
        borderRadius:10,
        marginBottom:20
    },
    topText:{
        fontSize:20,
        color:'black'
    },
    textInput:{
        height: 45,
        width:screen.width-60,
        borderColor: colors.gray2,
        // borderWidth: 1,
        borderRadius:10,
        marginBottom:10,
        paddingLeft:10,
        backgroundColor:'white'
    },
    loginButton:{
        width:100,
        height:40,
        // padding:10,
        textAlign:'center',
        // paddingLeft:20,
        // paddingRight:20,
        borderRadius:20,
        // borderWidth:screen.onePixel,
        backgroundColor:'white',
        borderColor:colors.gray2
    }
});

LoginScene = connect(null,dispatch=>({
    login(account,pwd,cb){
        dispatch(action.login(account,pwd,cb))
    }
}))(LoginScene);

export default withNavigation(LoginScene);
