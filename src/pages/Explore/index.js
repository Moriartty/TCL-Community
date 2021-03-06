/**
 * createdBy Moriarty
 * @flow
 */
//node_modules依赖
import {View, Text, Alert, Image, TouchableOpacity, StyleSheet, ScrollView, InteractionManager} from 'react-native';
import React,{PureComponent} from 'react';
import Carousel from 'react-native-looped-carousel';
// import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
//内部配置依赖
import {colors,theme} from '../../config';
//components
import {Heading3} from "../../components/Text";
import {ActionIcon,ExImage} from '../../components';
//pages
import CommonList from './CommonList';
//actions
import action from '../../actions/explore';

const imgUrls = [
    'https://cdn.pixabay.com/photo/2019/03/03/09/07/flowers-4031397__340.jpg',
    'https://cdn.pixabay.com/photo/2018/03/11/14/09/eggs-3216879__340.jpg',
    'https://cdn.pixabay.com/photo/2015/03/30/14/35/love-699480__340.jpg',
    'https://cdn.pixabay.com/photo/2017/02/11/17/07/god-2058084__340.jpg'
];

class Explore extends PureComponent<Props>{
    // static router = Tab.router;
    static navigationOptions = ({navigation})=>{
        return {
            headerLeft:
                <TouchableOpacity onPress={navigation.getParam('handleNavClick',null)}>
                    <View style={styles.headerLeft}>
                        <Image
                            style={styles.sidebarToggle}
                            source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}}
                        />
                        <Heading3>{navigation.getParam('title',null)}</Heading3>
                    </View>
                </TouchableOpacity>,
            headerRight:
                <TouchableOpacity onPress={navigation.getParam('handleRewardClick',null)}>
                    <View style={styles.headerRight}>
                        <ActionIcon name={'ios-gift'} size={20} color={colors.blue} />
                        <Heading3 style={{color:colors.blue,marginLeft:5}}>300</Heading3>
                    </View>
                </TouchableOpacity>,
            headerStyle:{
                backgroundColor:colors['headerBackground'],
                //将android和ios标题栏的阴影和分割线去除
                borderBottomWidth:0,
                shadowOpacity:0,
                elevation: 0
            },
            headerTintColor:colors["headerTintColor"],
            headerStyle:{
                shadowOpacity:0,
                elevation: 0,
                // paddingTop: StatusBar.currentHeight,
                height:theme.toolbarHeight
            }
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({
            handleNavClick:this.handleNavClick,
            handleRewardClick:this.handleRewardClick,
            title:'Hello,Moriarty'
        })
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.init();
        })
    }

    handleNavClick = () => {
        this.props.navigation.navigate('MyTCL');
    };
    handleRewardClick = () => {
        this.props.navigation.navigate('Rewards');
    };

    handleTopBarClick = (target) => {
        console.log('target:',target);
        target&&this.props.navigation.navigate(target);
    };
    handleItemClick = (target,id) => {
        console.log('target:',target,'  id:',id);
        //传递将目标页面和资源标识
        target&&this.props.navigation.navigate(target,{id:id});
    };

    render(){
        const {newsList,activitiesList} = this.props;
        return (
            <ScrollView>
                <Carousel
                    delay={3000}   //自动切换的延迟 （毫秒）
                    style={styles.carousel}  //轮播组件的样式
                    autoplay    //自动轮播
                    pageInfo={false}    //在底部显示当前页面下标 / 页面个数
                    swiper      //允许手势滑动

                    bullets={true}  //显示小圆点
                    bulletStyle={{backgroundColor: '#fff', width: 5, height: 5}} //未选中时小圆点的样式
                    chosenBulletStyle={{backgroundColor: 'red', width: 5, height: 5}}//选中时小圆点的样式

                    // arrows={true}  //显示导航箭头
                    // leftArrowText="left️" //左导航
                    arrowsContainerStyle={{paddingHorizontal:20}}   //箭头容器样式
                    // rightArrowText={<Animated.Image  //右导航
                    //     style={{
                    //         transform: [{rotate: spin}],
                    //         height:20,
                    //         width:20
                    //     }}
                    //     source={require('./img/a.jpg')}/>}
                >
                    {React.Children.map(imgUrls, (child, index) => {
                        return (
                            <View style={{width:'100%',height:'100%',flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ExImage uri={child} style={{width:'100%',height:'100%'}}/>
                                {/*<Text style={{color:'black'}}>{child + ',' + index}</Text>*/}
                            </View>
                        )
                    })}
                </Carousel>
                <CommonList
                    list={newsList}
                    topBarAction={this.handleTopBarClick.bind(this,'NewsDetail')}
                    itemClickAction={this.handleItemClick.bind(this,'NewsDetail')}
                />
                <CommonList
                    list={activitiesList}
                    topBarAction={this.handleTopBarClick.bind(this,'ActivitiesDetail')}
                    itemClickAction={this.handleItemClick.bind(this,'ActivitiesDetail')}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headerLeft:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    headerRight:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
    },
    sidebarToggle:{
        width:32,
        height:32,
        borderRadius:17,
        // borderWidth:2,
        // borderColor: 'black',
        marginLeft:10,
        marginRight:10
    },
    carousel:{
        width:'100%',
        height:180
    }
});

Explore = connect(state=>{
    const {newsList,activitiesList} = state['explore'];
    return {newsList,activitiesList};
},dispatch=>({
    init(){
        dispatch(action.loadNewsData());
        dispatch(action.loadActivitiesData());
    }
}))(Explore);

export default Explore;
