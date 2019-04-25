import React,{PureComponent} from 'react';
import {FlatList, View, StyleSheet, InteractionManager,Image} from 'react-native';
import {connect} from 'react-redux';
import {Heading3} from "../../components/Text";
import action from '../../actions/explore';
import Ionicons from "react-native-vector-icons/Ionicons";
import ExImage from '../../components/ExImage';

class ActivitiesList extends PureComponent<Props>{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }
    _renderItem = (rowData: any) => {
        return (
            <View style={styles.activitiesItem}>
                <ExImage uri={rowData.item.imgUrl} style={styles.pic}/>
                <Heading3>{rowData.item.title}</Heading3>
            </View>
        )
    };
    render(){
        const {activitiesList} = this.props;
        return (
            <View style={styles.activitiesContainer}>
                <View style={styles.activitiesHeader}>
                    <Heading3 style={{fontWeight:'bold',marginBottom:5}}>Activities</Heading3>
                    <Ionicons name={'ios-arrow-forward'} size={20}/>
                </View>
                <View style={{height:150,width:'100%'}}>
                    <FlatList
                        horizontal={true}
                        data={activitiesList}
                        // extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                        showsHorizontalScrollIndicator = {false}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activitiesContainer:{
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10
    },
    activitiesHeader:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        height:40,
        width: '100%',
        paddingRight:10
    },
    activitiesItem:{
        width:150,
        // height:250,
    },
    pic:{
        width:120,
        height:120,
        borderRadius:15
    }
})

ActivitiesList = connect(state=>{
    const {activitiesList} = state['explore'];
    return {activitiesList};
},dispatch=>({
    init(){
        // dispatch(action.loadactivitiesData());
        dispatch(action.loadActivitiesData());
    }
}))(ActivitiesList)

export default ActivitiesList;
