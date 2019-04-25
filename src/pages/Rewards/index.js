import {View,Text} from 'react-native';
import React,{PureComponent} from 'react';
import {SafeAreaView} from 'react-navigation';

class Rewards extends PureComponent<Props>{
    render(){
        return (
            <SafeAreaView>
                <View><Text>Rewards</Text></View>
            </SafeAreaView>
        )
    }
}

export default Rewards;
