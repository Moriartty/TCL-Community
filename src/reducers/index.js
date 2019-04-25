import {combineReducers} from 'redux';
import app from './app';
import home from './home';
import trending from './trending';
import explore from './explore';
import plate from './plate';

export default combineReducers({
    app,
    home,
    trending,
    explore,
    plate
})
