import React,{PureComponent} from 'react';
import {InteractionManager, View,StatusBar} from 'react-native';
import {colors,theme} from "../../config";
import CategoryScene from './CategoryScene';
import {connect} from 'react-redux';
import action from '../../actions/plate';
import {screen} from '../../utils';

class Plate extends PureComponent<Props>{
    static navigationOptions = ({navigation})=>{
        return {
            title:'Plate',
            headerTintColor:colors["headerTintColor"],
            headerStyle:{
                //将android和ios标题栏的阴影和分割线去除
                borderBottomWidth:screen.onePixel,
                borderBottomColor:colors.gray2,
                shadowOpacity:0,
                elevation: 0,
                // paddingTop: StatusBar.currentHeight,
                height:theme.toolbarHeight
            }
        }
    };
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }
    render(){
        return (
            <CategoryScene/>
        )
    }
}
Plate = connect(null,dispatch=>({
    init(){
        dispatch(action.loadCategoryData());
    }
}))(Plate);

export default Plate;
