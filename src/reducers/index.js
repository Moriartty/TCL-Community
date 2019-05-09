import {combineReducers} from 'redux';
import app from './app';
import home from './home';
import trending from './trending';
import explore from './explore';
import plate from './plate';
import gallery from './gallery';
import rewards from './rewards';
import login from './login';

export default combineReducers({
    app,
    home,
    trending,
    explore,
    plate,
    gallery,
    rewards,
    login
})
