# TCL-Community

## 技术选型及依赖包的选择与安装
### 技术选型
* 基础框架：react-native
* 状态管理：react-redux
* UI框架：react-native-elements(选用)
* 模拟接口：mock.js(选用)
* 路由导航：react-navigation
* 国际化：react-native-i18n
* 富文本编辑：react-native-zss-rich-text-editor(可以按需求自己封装其他web富文本插件，推荐quilljs)
* 图片服务：看看有没有可能使用专门的图片服务器结合懒加载来实现快速加载,
* 代码静态类型检查：flow
* 应用启动页：react-native-splash-screen（ios另说,ios需要另外配置）
* 数据本地存储：react-native-storage
### 依赖包的安装
常见依赖包只需要执行npm install <packageName> --save即可
以下项目中用到的依赖包由于与原生组件关联，需要执行react-native link <packageName>
1. react-navigation:用于导航和路由

安装：npm install --save react-navigation&&npm install --save react-native-gesture-handler

link所有的原生依赖：react-native link react-native-gesture-handler

2. react-native-vector-icons:react-native矢量图标库

安装：npm install --save react-native-vector-icons

link:react-native link react-native-vector-icons

3. react-native-collapsing-toolbar：用来实现android的CollapsingToolbarLayout控件

安装：npm install --save react-native-collapsing-toolbar

link:react-native link react-native-collapsing-toolbar

4. react-native-nested-scroll-view:用来搭配react-native-collapsing-toolbar使用，同样需要安装和link

注意，使用3，4控件的时，需要修改app/build.gradle中的dependencies,将其中的support包改为

**implementation 'com.android.support:design:27.1.0**

5. react-native-zss-rich-text-editor:富文本编辑

依赖于react-native-webview-bridge,两者都需要link一下，具体使用参考https://github.com/wix/react-native-zss-rich-text-editor

6. react-native-image-picker:照相机和图片处理插件，需要link.https://www.jianshu.com/p/727c9d4c080c

7. react-native-action-button:仿android FloatingActionButton

8. react-native-keyboard-aware-scroll-view：解决虚拟键盘挡住输入框问题，暂时未用到

9. react-native-linear-gradient：颜色渐变

10. react-native-modal-translucent:解决modal组件透明全屏时，statusBar变白问题，具体用法参见github

11. react-native-htmlview:用于将html富文本内容转化为native内容，比采用webview方案好
