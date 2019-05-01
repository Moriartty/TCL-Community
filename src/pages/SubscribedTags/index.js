import React,{PureComponent} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {colors} from "../../config";
import {Heading2, Paragraph} from "../../components/Text";
import {connect} from 'react-redux';
import {screen} from "../../utils";

const selectedTags = ['tutorials', 'Unboxing', 'T1 pro','moriarty', 'App Recommends'];

class SubscribedTags extends PureComponent<Props>{
    static navigationOptions = ({navigation})=>{
        return {
            title:'Subscribed Tags'
        }
    };
    render(){
        return (
            <View style={styles.tagsContainer}>
                <View style={{marginBottom:30}}>
                    <Heading2>Subscribed Tags</Heading2>
                    <View style={styles.subTagsContainer}>
                        {
                            selectedTags.map(item=>{
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        activeOpacity={1}
                                        style={[{ backgroundColor: colors.blue,borderColor:colors.blue  }, styles.item]}
                                        onPress={() => this.props.onSelected(i)}>
                                        <Paragraph style={{ color:  'white'  }}>
                                            {item}
                                        </Paragraph>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View>
                    <Heading2>Recommended</Heading2>
                    <View style={styles.subTagsContainer}>

                        {
                            selectedTags.map(item=>{
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        activeOpacity={1}
                                        style={[{ backgroundColor: 'white', borderColor:'#8c8c8c'  }, styles.item]}
                                        onPress={() => this.props.onSelected(i)}>
                                        <Paragraph style={{ color:  '#555555'  }}>
                                            {item}
                                        </Paragraph>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    tagsContainer:{
        flex:1,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10
    },
    subTagsContainer:{
        flexWrap:'wrap',
        width:'100%',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
    },
    item: {
        // width: screen.width / 3 - 10,
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 6,
        height: 30,
        paddingRight:10,
        paddingLeft:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: screen.onePixel*3,
    },
})

export default SubscribedTags;
