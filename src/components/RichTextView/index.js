import React, { Component } from 'react';
import {WebView, View, Platform} from 'react-native';
const iosPlatform = Platform.OS === 'ios'?true:false;
import WebViewBridge from 'react-native-webview-bridge-updated';

const injectScript = `
  (function () {
                    if (WebViewBridge) {
 
                      WebViewBridge.onMessage = function (message) {
                      
                        $('#moriarty').append(message);
                      };
                
                      // WebViewBridge.send("hello from webview");
                    }
                  }());
`;


export default class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.refs.richTextView.sendToBridge(this.props.text);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.text!==this.props.text){
            this.refs.richTextView.sendToBridge(nextProps.text);
        }
    }

    onBridgeMessage(message){
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
        const {width,height,text} = this.props;
        return (
            <View style={{width:width,height:height}}>
                <WebViewBridge
                    ref={'richTextView'}
                    source={iosPlatform?require('./richTextView.html'):{uri:'file:///android_asset/richTextView.html'}}
                    // source={{uri:'https://www.baidu.com'}}
                    style={{
                        height: height || 400,
                        width:width||'100%',
                        // backgroundColor: this.props.backgroundColor || 'transparent'
                        backgroundColor:'white'
                    }}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    injectedJavaScript={`
                    if (WebViewBridge) {

                          WebViewBridge.onMessage = function (message) {

                            $('#moriarty').append(message);
                          };

                          // WebViewBridge.send("hello from webview");
                        }
                    `}
                />
            </View>
        );
    }
}
