import React,{PureComponent,Component} from 'react';
import {Image} from 'react-native';

class ExImage extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            width:200,
            height:200
        }
    }
    componentWillMount() {
        const style = this.props.style;
        Image.getSize(this.props.uri, (width, height) => {
            if (style.width && !style.height) {//如果只提供了宽或高，则按图片比例显示
                this.setState({ width: style.width, height: height * (style.width / width) });
            } else if (!style.width && style.height) {
                this.setState({ width: width * (style.height / height), height: style.height });
            } else {//如果提供了宽高，则按提供的宽高显示
                this.setState({ width: style.width||width, height: style.height||height });
            }
        });
    }

    render(){
        const {uri,style} = this.props;
        return (
            <Image
                source={{uri}}
                style={[style,{ height: this.state.height, width: this.state.width }]}
                defaultSource={require('../img/default.jpg')}
                {...this.props}
            />
        )
    }
}

export default ExImage;
