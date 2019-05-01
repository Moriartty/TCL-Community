import Ionicons from "react-native-vector-icons/Ionicons";
import React,{PureComponent} from 'react';
import {colors} from '../config';
import {objectAppend} from "../utils";

class ActionIcon extends PureComponent<Props>{
    render(){
        const {name,size,highLight,color} = this.props;
        const style = objectAppend({
            // color:highLight?colors.actionIconHighLight:colors.actionIconColor,
            marginRight:5
        },this.props.style);
        return (
            <Ionicons name={name} size={size} color={color} style={style} />
        )
    }
}

export default ActionIcon;
