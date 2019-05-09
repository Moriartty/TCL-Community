import React from 'react';
import {View, TouchableOpacity, Text, InteractionManager,StyleSheet,Image,TextInput,StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';
//components
import {ExImage,CustomButton,ActionIcon} from '../../components';
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
        //登录成功后，进入主页面并重置路由，保证应用退出后不会再返回登录页
        this.props.login(account,pwd,this.props.navigation.dispatch.bind(this,resetAction));
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
                        <TextInput
                            allowFontScaling={true}
                            style={styles.textInput}
                            placeholder={'EMAIL OR PHONE'}
                            onChangeText={(account) => this.setState({account})}
                            value={this.state.account}
                        />
                        <TextInput
                            allowFontScaling={true}
                            style={styles.textInput}
                            placeholder={'PASSWORD'}
                            onChangeText={(pwd) => this.setState({pwd})}
                            value={this.state.pwd}
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
                        <CustomButton title={'LOGIN'} style={styles.loginButton} titleStyle={{color:'black'}} onPress={this.handleLogin}/>
                    </View>
                </View>
                <View style={{height:'40%',justifyContent:'flex-end'}}>
                    <View style={styles.content3}>
                        <Text style={{color:'black',fontSize:14}}>Or Login With</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',width:'60%'}}>
                            <ActionIcon name={'logo-facebook'} size={45}/>
                            <ActionIcon name={'logo-twitter'} size={45}/>
                            <ActionIcon name={'logo-google'} size={45}/>
                        </View>
                    </View>
                    <View style={styles.content4}>
                        <TouchableOpacity

                        >
                            <Text>Not a member? SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        padding:30
    },
    content1:{
        alignItems:'center',
        marginBottom:30
    },
    content2:{
        alignItems:'center',
    },
    content3:{
        alignItems:'center',
        width:'100%',
        height:100,
        justifyContent:"space-around",
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
        borderWidth: 1,
        borderRadius:10,
        marginBottom:10,
        paddingLeft:10
    },
    loginButton:{
        width:100,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:30,
        borderWidth:screen.onePixel,
        borderColor:colors.gray2
    }
});

LoginScene = connect(null,dispatch=>({
    login(account,pwd,cb){
        dispatch(action.login(account,pwd,cb))
    }
}))(LoginScene);

export default withNavigation(LoginScene);
