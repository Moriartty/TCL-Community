import React,{PureComponent} from 'react';
import {View,ImageBackground, Text,ToolbarAndroid,StyleSheet} from 'react-native';
import {
    AppBarLayout,
    CoordinatorLayout,
    CollapsingToolbarLayout,
    CollapsingParallax,
} from 'react-native-collapsing-toolbar'
import NestedScrollView from 'react-native-nested-scroll-view';
import {Heading4,Paragraph} from "../../../components/Text";
import Separator from '../../../components/Separator';
import ExImage from '../../../components/ExImage';
import {screen} from "../../../utils";
import {colors} from "../../../config";

const appBarHeight = 330;

class AppBar_Android extends PureComponent<Props>{
    render(){
        const {navigation} = this.props;
        return (
            <CoordinatorLayout>
                <AppBarLayout style={{height: appBarHeight}}>
                    <CollapsingToolbarLayout
                        title={navigation.getParam('title')}
                        contentScrimColor='#ffffff'
                        expandedTitleColor={'white'}
                        expandedTitleGravity='TOP'
                        scrimAnimationDuration={300}
                        expandedTitleMarginStart={22}
                        expandedTitleMarginBottom={22}
                        collapsedTitleGravity={'CENTER'}
                        scrollFlags={
                            AppBarLayout.SCROLL_FLAG_SCROLL
                            | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
                            | AppBarLayout.SCROLL_FLAG_SNAP
                        }>
                        <CollapsingParallax parallaxMultiplier={0.6}>
                            <View collapsable={false} style={{height: appBarHeight, justifyContent: 'center'}}>
                                <View style={{flex:1,height:appBarHeight/2}}>
                                    <ImageBackground
                                        style={{width:'100%',height:appBarHeight/2,opacity:0.6,backgroundColor:'#000',justifyContent:'flex-end',alignItems:'flex-start'}}
                                        source={{uri:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=583188744,2516998128&fm=15&gp=0.jpg'}}
                                        resizeMode={'cover'}
                                    >
                                        <View style={{marginLeft:22,marginBottom:30}}>
                                            <Heading4 style={{color:'white'}}>版主：陈冰</Heading4>
                                            <Heading4 style={{color:'white'}}>讨论：8888888 关注：888888</Heading4>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={{backgroundColor:'white',flex:1,height:appBarHeight/2,paddingLeft:20,paddingRight:20}}>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
                                        <ExImage
                                            style={{width:60,height:60,marginTop:-20,borderRadius:5}}
                                            uri={'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=583188744,2516998128&fm=15&gp=0.jpg'}
                                            resizeMode={'cover'}
                                        />
                                        <Text style={styles.attentionIcon}>关注</Text>
                                    </View>
                                    <View style={{paddingTop:20}}>
                                        <Paragraph style={{color:'black'}}>
                                            2018年，TCL通讯中国区市场将主打黑莓品牌，目标职业高端用户。与夏普、诺基亚不一样，黑莓除了情怀牌之外，还有保护隐私、安全、可靠的标签，针对的人群更加细分化，更多的是商业精英。
                                        </Paragraph>
                                    </View>
                                </View>
                                <Separator style={{height:5,backgroundColor:colors.border}}/>
                            </View>
                        </CollapsingParallax>
                        <ToolbarAndroid actions={[{title: 'Settings'}]} />
                    </CollapsingToolbarLayout>
                </AppBarLayout>
                <NestedScrollView style={{width:'100%',height:'100%'}}>
                    {this.props.children}
                </NestedScrollView>
            </CoordinatorLayout>
        )
    }
}

const styles = StyleSheet.create({

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

export default AppBar_Android;
