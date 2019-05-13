/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
//component
import {ExInput} from '../../components';
import {screen} from "../../utils";
//pages
import SignUpScene from './SignUpScene';
import {theme} from "../../config";




class SignUp extends React.Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerStyle:{
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
    render(){
        return (
            <ScrollView style={styles.signUpContainer}>
                <SignUpScene/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    signUpContainer:{
        width:'100%',
        height:'100%',
        paddingLeft:30,
        paddingRight:30
    },
});

export default SignUp;
