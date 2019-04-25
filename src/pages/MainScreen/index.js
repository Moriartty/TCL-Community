import React,{PureComponent} from 'react';
import {TouchableOpacity,StyleSheet,Image,View,Alert} from 'react-native';
import {createBottomTabNavigator, TabBarBottom,SafeAreaView,createStackNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Heading3} from "../../components/Text";
import Message from "../Message";
import Explore from "../Explore";
import {colors} from "../../config";
import Home from "../Home";
import MyTCL from "../MyTCL";

const Tab = createBottomTabNavigator(
    {
        Explore:{screen:createStackNavigator({Explore:Explore})},
        Community:{screen:Home},
        // Message:Message,
        MyTCL:MyTCL
    },{
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                switch(routeName){
                    case 'Community':
                        iconName = `ios-home${focused ? '' : ''}`;
                        break;
                    case 'Explore':
                        iconName = `ios-planet${focused ? '' : ''}`;
                        break;
                    case 'Message':
                        iconName = `ios-at${focused ? '' : ''}`;
                        break;
                    case 'MyTCL':
                        iconName = `ios-person${focused ? '' : ''}`;
                        break;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: colors.gray,
            style: { backgroundColor: '#ffffff' },
        },
    }
);
Tab.navigationOptions = {
    header: null,
};


// class MainScreen extends PureComponent<Props>{
//     static router = Tab.router;
//     static navigationOptions = ({navigation})=>{
//         return {
//             // title:navigation.getParam('title',null),
//             headerLeft:
//                 <TouchableOpacity onPress={navigation.getParam('handleNavClick',null)}>
//                     <View style={styles.headerLeft}>
//                         <Image
//                             style={styles.sidebarToggle}
//                             source={{uri:'https://avatars0.githubusercontent.com/u/15435074?s=460&v=4'}}
//                         />
//                         <Heading3>{navigation.getParam('title',null)}</Heading3>
//                     </View>
//                 </TouchableOpacity>,
//             headerStyle:{
//                 backgroundColor:colors['headerBackground'],
//                 //将android和ios标题栏的阴影和分割线去除
//                 borderBottomWidth:0,
//                 shadowOpacity:0,
//                 elevation: 0
//             },
//             headerTintColor:colors["headerTintColor"]
//         }
//     };
//     handleNavClick = () => {
//         this.props.navigation.navigate('Rewards');
//     };
//
//     componentWillMount() {
//         // this.props.init();
//         this.props.navigation.setParams({
//             handleNavClick:this.handleNavClick,
//             title:'Hello Moriarty'
//         })
//     }
//     render() {
//         const {navigation} = this.props;
//         return (
//             <View style={{width:'100%',height:'100%'}}>
//                 <Tab navigation={navigation} />
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     headerLeft:{
//         flex:1,
//         flexDirection:'row',
//         alignItems:'center'
//     },
//     sidebarToggle:{
//         width:32,
//         height:32,
//         borderRadius:17,
//         // borderWidth:2,
//         // borderColor: 'black',
//         marginLeft:10,
//         marginRight:10
//     }
// });

export default Tab;
