import React,{PureComponent} from 'react';
import {FlatList, View, StyleSheet, InteractionManager,Image} from 'react-native';
import {connect} from 'react-redux';
import {Heading3} from "../../components/Text";
import action from '../../actions/explore';
import Ionicons from "react-native-vector-icons/Ionicons";

class NewsList extends PureComponent<Props>{
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
            <View style={styles.newsItem}>
                <Image source={{uri:rowData.item.imgUrl}} style={styles.pic}/>
                <Heading3>{rowData.item.title}</Heading3>
            </View>
        )
    };
    render(){
        const {newsList} = this.props;
        return (
            <View style={styles.newsContainer}>
                <View style={styles.newsHeader}>
                    <Heading3 style={{fontWeight:'bold',marginBottom:5}}>News</Heading3>
                    <Ionicons name={'ios-arrow-forward'} size={20}/>
                </View>
                <FlatList
                    horizontal={true}
                    data={newsList}
                    // extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator = {false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newsContainer:{
        width:'100%',
        // height:250,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10
    },
    newsHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        height:40,
        width: '100%',
        paddingRight:10
    },
    newsItem:{
        width:150,
        // height:250,
    },
    pic:{
        width:120,
        height:120,
        borderRadius:15
    }
})

NewsList = connect(state=>{
    const {newsList} = state['explore'];
    return {newsList};
},dispatch=>({
    init(){
        dispatch(action.loadNewsData());
    }
}))(NewsList)

export default NewsList;
