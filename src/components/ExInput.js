/**
 * createdBy Moriarty
 * @flow
 */
//node_modules
import React,{PureComponent} from 'react';
import {TextInput,View,StyleSheet} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
//配置
import {colors} from "../config";
import {screen} from "../utils";

type Props = {
    width:number,
    height:number
}

let textInputShadow = {
    color:"#bfbfbf",
    border:2,
    radius:10,
    opacity:0.3,
    x:0,
    y:0,
    style:{marginVertical:5}
};

class ExInput extends PureComponent<Props>{
    constructor(props){
        super(props);
        textInputShadow.width = props.width;
        textInputShadow.height = props.height;
    }
    render(){
        const {width,height, placeholder,_onChangeText,val, style} = this.props;
        return (
            <View style={style}>
                <BoxShadow setting={textInputShadow}>
                    <TextInput
                        allowFontScaling={true}
                        style={[styles.textInput,{width,height}]}
                        placeholder={placeholder}
                        onChangeText={_onChangeText}
                        value={val}
                    />
                </BoxShadow>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput:{
        borderColor: colors.gray2,
        // borderWidth: 1,
        borderRadius:10,
        marginBottom:10,
        paddingLeft:10,
        backgroundColor:'white'
    },
});

export default ExInput;
