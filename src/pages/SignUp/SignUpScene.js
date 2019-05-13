/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,CheckBox,TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
//component
import {ExInput,CustomButton,ActionIcon} from '../../components';
import {screen} from "../../utils";
import {colors} from "../../config";


const inputWidth = screen.width-64,inputHeight = 45;

type State = {
    firstName:string,
    lastName:string,
    emailOrPhone:string,
    password:string,
    confirmPwd:string
}

class SignUpScene extends React.Component<State>{

    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            emailOrPhone:'',
            password:'',
            confirmPwd:''
        }
    }
    render(){
        return (
            <View>
                <View style={{marginBottom:20}}>
                    <Text style={{fontSize:28,color:'black',marginBottom:5}}>Sign Up</Text>
                    <Text style={{fontSize:18,color:'black'}}>Create Your TCL Account</Text>
                </View>
                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>First Name</Text>
                        <ExInput
                            style={{marginLeft:2}}
                            width={inputWidth}
                            height={inputHeight}
                            placeholder={''}
                            _onChangeText={(firstName) => this.setState({firstName})}
                            val={this.state.firstName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Last Name</Text>
                        <ExInput
                            style={{marginLeft:2}}
                            width={inputWidth}
                            height={inputHeight}
                            placeholder={''}
                            _onChangeText={(lastName) => this.setState({lastName})}
                            val={this.state.lastName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Email Or Phone</Text>
                        <ExInput
                            style={{marginLeft:2}}
                            width={inputWidth}
                            height={inputHeight}
                            placeholder={''}
                            _onChangeText={(emailOrPhone) => this.setState({emailOrPhone})}
                            val={this.state.emailOrPhone}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <ExInput
                            style={{marginLeft:2}}
                            width={inputWidth}
                            height={inputHeight}
                            placeholder={''}
                            _onChangeText={(password) => this.setState({password})}
                            val={this.state.password}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Confirm Password</Text>
                        <ExInput
                            style={{marginLeft:2}}
                            width={inputWidth}
                            height={inputHeight}
                            placeholder={''}
                            _onChangeText={(confirmPwd) => this.setState({confirmPwd})}
                            val={this.state.confirmPwd}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text>I agree the police and terms</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <BoxShadow setting={loginBtnShadow}>
                        <CustomButton title={'SIGN UP'} style={styles.signUpButton} titleStyle={{color:'black'}} onPress={this.handleLogin}/>
                    </BoxShadow>
                </View>
                <View style={{justifyContent:'flex-end', alignItems:'center',marginTop:50,marginBottom:20}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'black',fontSize:14}}>Or Connect With</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:200}}>
                            <ActionIcon name={'logo-facebook'} size={45}/>
                            <ActionIcon name={'logo-twitter'} size={45}/>
                            <ActionIcon name={'logo-google'} size={45}/>
                        </View>
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
    inputContainer:{
        marginBottom:5
    },
    inputTitle:{
        fontSize:13,
        color:'black'
    },
    signUpButton:{
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

export default SignUpScene;
