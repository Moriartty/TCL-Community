import React,{PureComponent} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity, InteractionManager,Alert} from 'react-native';
import {RichTextEditor,RichTextToolbar} from 'react-native-zss-rich-text-editor';
import ImagePicker from 'react-native-image-picker';
import {colors} from '../../config';
import ActionIcon from '../../components/ActionIcon';

class Release extends PureComponent<Props>{
    static navigationOptions = ({navigation}) => {
        return {
            headerRight:
                <TouchableOpacity onPress={navigation.getParam('handleSubmit',null)} activeOpacity={1} style={{marginRight:15}}>
                    <ActionIcon name={'ios-paper-plane'} size={25} color={colors.gray2}/>
                </TouchableOpacity>,
            headerLeft:
                <TouchableOpacity onPress={navigation.getParam('handleCancel',null)} activeOpacity={1} style={{marginLeft:20}}>
                    <ActionIcon name={'ios-close'} size={35} color={'black'}/>
                </TouchableOpacity>,
        }
    }

    constructor(props) {
        super(props);
        this.getTitle = this.getTitle.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({'handleSubmit':this.handleSubmit,'handleCancel':this.handleCancel});
        })
    }

    handleSubmit = () => {
        Promise.all([this.getTitle(),this.getContent()]).then((vals)=>{
            console.log(vals)
        })
    }

    handleCancel = () => {
        Alert.alert('确定要退出编辑吗？','记录将不会被保存！', [
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () =>  this.props.navigation.goBack()},
        ],);
    }

    render() {
        return (
            <View style={styles.container}>
                <RichTextEditor
                    ref={(r)=>this.richtext = r}
                    style={styles.richText}
                    initialTitleHTML={'Title!!'}
                    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />
                <RichTextToolbar
                    getEditor={() => this.richtext}
                    onPressAddImage={this.addImage}
                    selectedButtonStyle={{backgroundColor:colors.blue, color:'white'}}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer/>}
            </View>
        );
    }
    addImage = () => {
        let options = {
            includeBase64: true,
            width: 300,
            height: 400,
            cropping: true
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source)
                // let imageSrc = `data:${image.mime};base64,${image.data}`;
                this.richtext.insertImage({src: source.uri});
            }
        });
    }

    onEditorInitialized() {
        this.setFocusHandlers();
        this.getHTML();
    }

    async getTitle (){
        const titleHtml = await this.richtext.getTitleHtml();
        return titleHtml;
    }

    async getContent () {
        const contentHtml = await this.richtext.getContentHtml();
        return contentHtml;
    }

    setFocusHandlers = () => {
        //解决内容后滚问题
        // this.richtext.setEditorHeight(75);
        // //打开后直接聚焦输入框
        // this.richtext.focusContent(true);

        this.richtext.setTitleFocusHandler(() => {
            //alert('title focus');
        });
        this.richtext.setContentFocusHandler(() => {
            //alert('content focus');
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 20
    },
    richText: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});
export default Release;
