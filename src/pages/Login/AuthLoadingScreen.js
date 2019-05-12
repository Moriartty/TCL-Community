import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image
} from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {
        global.storage._load(
            'accessToken',
            (token)=>{console.log('access_token',token);this.props.navigation.navigate(token ? 'App' : 'Auth');})
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                {/*<ActivityIndicator />*/}
                {/*<StatusBar barStyle="default" />*/}
                {/*<Image source={require('../../img/launch_screen.png')} style={{width:'100%',height:'100%'}}/>*/}
            </View>
        );
    }
}

export default AuthLoadingScreen;
