import React,{PureComponent} from 'react';
import {View,FlatList,StyleSheet,TouchableOpacity,Text} from 'react-native';
import {connect} from 'react-redux';
import {colors} from "../../../config";
import {Heading2, Paragraph} from "../../../components/Text";
import {screen} from "../../../utils";
import Separator from '../../../components/Separator';
import ExImage from '../../../components/ExImage';
import {withNavigation} from 'react-navigation';

function getChilds(list,selected){
    return list.find(o=>{
        return o.id==selected
    }).childs
}

class CategoryScene extends PureComponent<Props>{
    constructor(props){
        super(props);
        this.state = {
            selected:0,
            childs:[]
        }
    }
    _renderParentItem = (rowData:any) => {
        const item = rowData.item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[{
                    backgroundColor: this.state.selected == item.id ? 'white' : colors.gray ,
                }, styles.parentItem]}
                onPress={() => this.handleParentSelect(item)}>
                <Paragraph style={{
                    color: this.state.selected == item.id ? colors.blue : '#555555' ,
                    fontWeight:this.state.selected == item.id ? 'bold':'normal'
                }}>
                    {item.name}
                </Paragraph>
            </TouchableOpacity>
        )
    }
    _renderChildItem = (rowData:any) => {
        const item = rowData.item;
        return (
            <TouchableOpacity
                style={styles.childItem}
                activeOpacity={1}
                onPress={() => this.reHref(item)}
            >
                <ExImage style={{width:50,height:50}} uri={'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=583188744,2516998128&fm=15&gp=0.jpg'}/>
                <View>
                    <Heading2>{item.title}</Heading2>
                    <Paragraph style={{ color:  '#555555' }}>
                        {item.subTitle}
                    </Paragraph>
                </View>
                <Text style={styles.attentionIcon}>关注</Text>
            </TouchableOpacity>
        )
    }
    handleParentSelect = (item) => {
        this.setState({
            selected:item.id,
            childs:getChilds(this.props.categoryList,item.id)
        });
    }
    renderSeparator = (color) => {
        return (
            <Separator style={{backgroundColor:color,height:1}}/>
        )
    }
    reHref = (item) => {
        this.props.navigation.navigate('TopicDetailPage',{title:item.title});
    }
    componentDidUpdate() {
        if(this.props.categoryList.length>0)
            this.setState({childs:getChilds(this.props.categoryList,this.state.selected)});
    }
    render(){
        return (
            <View style={styles.plateContainer}>
                <View style={styles.leftView}>
                    <FlatList
                        data={this.props.categoryList}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderParentItem}
                        ItemSeparatorComponent={this.renderSeparator.bind(this,'white')}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.rightView}>
                    <FlatList
                        data={this.state.childs}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderChildItem}
                        // ItemSeparatorComponent={this.renderSeparator.bind(this,colors.gray)}
                        showsVerticalScrollIndicator = {false}
                    />
                </View>
            </View>
        )
    }
}

CategoryScene = connect(state=>{
    const {categoryList} = state['plate'];
    return {categoryList};
},null)(CategoryScene);

const styles = StyleSheet.create({
    plateContainer:{
        width:'100%',
        height:'100%',
        flexDirection:'row'
    },
    leftView:{
        width:'25%',
        height:'100%'
    },
    rightView:{
        width:'75%',
        height:'100%'
    },
    parentItem: {
        // width: screen.width / 3 - 10,
        height: 70,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    childItem:{
        height:70,
        width:'100%',
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    attentionIcon:{
        width:60,
        borderRadius:12,
        borderColor:colors.blue,
        borderWidth:1,
        color:colors.blue,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:5,
        paddingRight:5,
        fontSize:12,
        textAlign:'center'
    }
});

export default withNavigation(CategoryScene);
