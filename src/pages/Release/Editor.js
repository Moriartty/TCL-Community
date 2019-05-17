import React,{PureComponent} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity, InteractionManager,Alert} from 'react-native';
import {RichTextEditor,RichTextToolbar} from 'react-native-zss-rich-text-editor';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import { ToastAndroid } from 'react-native';

//配置
import {colors} from '../../config';
import {dataURLtoFile,dataURLtoBlob,blobToFile} from "../../utils";

//actions
import plateAction from '../../actions/plate';
//




class Editor extends PureComponent<Props>{

    constructor(props) {
        super(props);
        props.onRef(this);
        this.getTitle = this.getTitle.bind(this);
        this.getContent = this.getContent.bind(this);
    }


    handleSubmit = () => {
        const {releasePlateArticle,navigation,handleModalVisible} = this.props;
        Promise.all([this.getTitle(),this.getContent()]).then((vals)=>{
            if(vals[0]&&vals[1]){
                handleModalVisible(true);
                releasePlateArticle(vals[0],vals[1],function(resp){
                    //success
                    ToastAndroid.show("发表成功", ToastAndroid.SHORT);
                    navigation.goBack()
                },function(resp){
                    //error
                    handleModalVisible(false);
                    ToastAndroid.show(JSON.stringify(resp.error), ToastAndroid.SHORT);
                });
            }else{
                ToastAndroid.show("请填写完整内容！", ToastAndroid.SHORT);
            }
        })
    };


    render() {
        return (
            <React.Fragment>
                <RichTextEditor
                    ref={(r)=>this.richtext = r}
                    style={styles.richText}
                    titlePlaceholder={'请输入标题'}
                    contentPlaceholder={'请输入内容'}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />
                <RichTextToolbar
                    getEditor={() => this.richtext}
                    onPressAddImage={this.addImage}
                    selectedButtonStyle={{backgroundColor:colors.blue, color:'white'}}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer/>}
            </React.Fragment>
        );
    }
    addImage = () => {
        let options = {
            includeBase64: true,
            width: 300,
            height: 400,
            cropping: true
        };
        //暂时不用react-native-image-crop-picker
        // ImagePicker.openPicker({
        //     multiple: true
        // }).then(images => {
        //     console.log(images);
        // });
        ImagePicker.showImagePicker(options, (response) => {

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
                console.log('Response = ', response);
                const base64Data = 'data:'+response.type+';base64,' + response.data;
                // //调用
                // var blob = dataURLtoBlob(base64Data);
                // var file = blobToFile(blob, response.fileName);
                //调用
                var file = dataURLtoFile('data:'+response.type+';base64,' + response.data, response.fileName);
                this.props.uploadPic(file,(resp)=>{
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    console.log('resp',resp);
                    this.richtext.insertImage({src: resp.data});
                },()=>{
                    ToastAndroid.show('图片上传失败',ToastAndroid.SHORT);
                })
            }
        });
    }

    onEditorInitialized() {
        this.setFocusHandlers();
        // this.getHTML();
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

Editor = connect(null,dispatch=>({
    releasePlateArticle(title,content,success,failed){
        dispatch(plateAction.releaseArticle(title,content,success,failed));
    },
    uploadPic(file,success,failed){
        dispatch(plateAction.uploadPics(file,success,failed));
    }
}))(Editor);

export default Editor;
