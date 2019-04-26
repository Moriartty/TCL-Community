import React,{PureComponent} from 'react';
import {Image} from 'react-native';

class ExImage extends PureComponent<Props>{
    render(){
        const {uri,style} = this.props;
        return (
            <Image
                source={{uri}}
                style={style}
                defaultSource={require('../img/default.jpg')}
                {...this.props}
            />
        )
    }
}
export default ExImage;
