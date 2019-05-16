import React, { Component } from 'react';
import {WebView, View, Platform} from 'react-native';
const iosPlatform = Platform.OS === 'ios'?true:false;
//react-native的webview用不了，烦人
import WebViewBridge from 'react-native-webview-bridge-updated';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:0
        }
    }

    componentDidMount() {
        this.refs.richTextView.sendToBridge(this.props.text);
    }

    componentWillReceiveProps(nextProps) {
        this.refs.richTextView.sendToBridge(nextProps.text)
    }

    onBridgeMessage(message){
        this.setState({height:parseInt(message)+20});
        // const { richTextView } = this.refs;
        //
        // switch (message) {
        //     case "hello from webview":
        //         richTextView.sendToBridge("hello from react-native");
        //         break;
        //     case "got the message inside webview":
        //         console.log("we have got a message from webview! yeah");
        //         break;
        // }
    }

    render() {
        const {width} = this.props;
        return (

                <WebViewBridge
                    ref={'richTextView'}
                    source={iosPlatform?require('./richTextView.html'):{uri:'file:///android_asset/richTextView.html'}}
                    style={{
                        height: this.state.height||0,
                        width:width||'100%',
                        // backgroundColor: this.props.backgroundColor || 'transparent'
                        backgroundColor:'white'
                    }}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    injectedJavaScript={`
                        if (WebViewBridge) {
                          WebViewBridge.onMessage = function (message) {
                            $('#moriarty').html(message);
                            var height = null;
                            function changeHeight() {
                              if (document.body.scrollHeight != height) {
                                height = document.body.scrollHeight;
                                WebViewBridge.send(height);

                              }
                            }
                            setTimeout(changeHeight, 100);
                          };
                        }
                    `}
                />
        );
    }
}
