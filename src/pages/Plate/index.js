import React,{PureComponent} from 'react';
import {InteractionManager, View} from 'react-native';
import {colors} from "../../config";
import CategoryScene from './CategoryScene';
import {connect} from 'react-redux';
import action from '../../actions/plate';

class Plate extends PureComponent<Props>{
    static navigationOptions = ({navigation})=>{
        return {
            title:'Plate',
            headerTintColor:colors["headerTintColor"]
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
