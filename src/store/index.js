// import configureStore from './configureStore';
import React from 'react';
import {Provider} from 'react-redux';
import App from '../App';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
const logger = createLogger();
import RootReducer from '../reducers';

global.storage = require('../utils/storage');

const store = createStore(RootReducer,applyMiddleware(thunk,logger));

class Root extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     store:null
        // }
    }
    // componentWillMount() {
    //     global.storage._load('token',(token)=>{token&&this.props.navigation.navigate('Tab');})
    // }
    componentDidMount() {
        // this.setState({store:configureStore()})
    }

    render(){
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
module.exports = Root;
