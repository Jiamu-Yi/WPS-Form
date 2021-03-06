# 01组大作业

预览地址：http://101.43.140.200:8088

测试账号：yjm

测试密码：123

代码分支：master

## 模块划分

- 登陆页面
    - 登陆模块
- 注册页面
    - 注册模块
- 新建 / 编辑表单页面
    - 编辑页面
        - 添加问题模块
            - 问题添加模块
            - 问题展示模块
            - 常用题管理模块
                - 添加/编辑常用题模块（设置问题类型，问题标题，问题细节，是否为必填）
                - 展示常用题模块（调整常用题顺序，删除常用题）
        - 表单操作模块（预览，保存草稿，完成创建）
        - 编辑表单模块
            - 拖拽改变问题顺序模块
            - 复制问题模块
            - 改变问题类型模块
            - 工具栏模块（包括：设置是否必填，全部设置为非必填，复制问题，删除，设置为常用题）
            - 七种问题类型（包括：填空模块，单选模块，多选模块，下拉选择模块，日期模块，时间模块，分数模块）
    - 预览页面
        - 切换预览方式模块
        - 电脑端预览模块
        - 手机端预览模块
- 表单列表页面
    - 左侧"新建表单"按钮操作栏
    - 右侧表单列表栏
        - "仅展示星标"按钮模块
        - 表单展示及操作列表模块
            - 展示简略表单信息模块
            - 操作模块（包括：标星，查看结果，删除，分享，查看结果，停止，发布）
- 填写表单页面
    - 填写模块（包括：填空，单选，多选，下拉选择，日期，时间，分数）
    - 填写成功模块
- 表单结果页面
    - 表单详细页面
        - 总览数据模块
        - 分页器模块
        - 展示填写用户模块
        - 详细展示结果模块
        - 无结果展示模块
    - 表单问题页面
        - 展示表单问题模块
        - 修改/填写 表单 按钮模块
    - 分享表单页面
        - 二维码生成模块
        - 二维码下载模块
        - 链接复制模块
- 表头模块
    - 返回/标题模块
    - 提供给切换预览页面的插槽模块
    - 展示用户信息模块

## 小组分工

- 易嘉木

    - 基础配置
        - 设计并不断重构项目结构（**重构了2次**）
        - 将服务端部署到服务器
        - 将项目部署到服务器
        - 使用Axios库封装HTTP请求
        - 封装Axios请求
        - 建立Vuex结构
        - 建立路由结构
        - 使用Ant Design Vue，增加了全局加载动画
        - 使用Ant Design Vue，增加了全局的操作提示
        - 使用原生样式修改了部分页面的滑动条样式
        - 实现了组件懒加载，提高运行速率
        - 将Ant Design Vue 改为**按需引入**，提高运行效率
      - 引入加载动画，提高用户使用体验
      - 整理编写README文档
    - 版本迁移（因为我们开始时老师说的是Vue2 或 Vue3 ，JS或TS 都可以，所以我们一开始用Vue2 + JS开发的）

        - 负责从Vue2 迁移至 Vue3
        - 负责从JS 迁移至 TS
        - 负责从选项式迁移至组合式
        - 由Props传值改为Provide/inject传值
        - 重写了表头模块，复制问题功能，更改问题类型功能，表单列表动态化的功能，以适应Vue3+setup+TS的需要
    - 新建 / 编辑表单页面

        - 重写了许志超的获取焦点函数，由自定义事件改为**watch + beforeUpdated** 进行监听为核心，对定位进行正确的判断，实现可以从中插入问题和尾部插入问题的功能
        - **编写问题构造器函数**，实现了添加问题模块中“添加题目”的功能
        - 使用问题构造器函数，重写许志超的“改变问题类型模块”，使得该模块可以真正的修改问题而不是只修改类型
        - 调用vue.draggable库，实现**拖拽改变问题排序**的功能
        - 调用vue.draggable库，实现**拖拽改变选择题选项排序**的功能
        - 实现了工具栏中设为必选题，全部设为必选题，删除，添加为常用题的功能；

        - 使用问题构造器函数重写了贺维杰的**复制**的功能。

        - 使用Ant Design中的对话框组件作为管理常用题的容器
        - 实现管理常用题中的**排序**和**删除**功能
        - 实现管理编辑常用题中的**新增常用题**和**编辑常用题**的功能
        - 使用scrollintoView实现添加问题后，页面滑动到视图中央的效果
        - 使用深度监测，实现对用户的修改进行监控，当用户修改表单后没有保存就刷新，会提示用户未保存
    - 表单列表页面

        - 完善了页面的样式，**每个表单的样式会根据状态的不同发生改变**
        - 为每一个表单添加点击事件，不同状态的表单会触发不同的事件（草稿=>编辑，正在收集=>表单问题页，已结束=>表单结果页）
        - 完善了**仅展示星标**，**发布**，**删除**，**编辑**和**收藏业务**，在操作之后会自动刷新页面并且会有响应的反馈
        - 实现了“**查看结果**"，”**停止**“，**”取消收藏**“，”**分享**“等功能
    - 填写表单页面

        - 编写了页面的UI，电脑端和**移动端**的界面，可以通过手机扫二维码进行填写表单
        - 使用Ant Design Vue 实现填写七种类型问题的样式
        - 编写了提交成功的页面
        - 实现了对**必选题的判空操作**
    - 表单结果页面

        - 重写了周硕的分享表单页面的UI和业务逻辑
        - 使用QrcodeVue库，**构造分享页面的二维码**
        - 在详细结果页面，添加了当收集表单为空时，显示未收集表单的页面
    - 个人中心页面
        - 借用了React组蒋涛的图床接口，**实现了修改头像的功能**
        - 重写了页面样式
        - 重写了修改昵称的业务
        - 重写了修改密码的业务
    - 表头模块

        - 为了避免路由跳转导致Vuex内容重置，每次切换或刷新都会对Vuex中的用户信息进行判断，如果为空就重新获取

    - 修复bug（好多好多好多）
- 贺维杰：

    - 注册页面
        -
        实现了对注册页面进行基本功能设计，并对注册的逻辑进行设计，对于输入框的基础判空，前后输入密码是否进行了人性化设计，在判断是否满足接口要求并满足注册的一系列条件后将会跳转到登录页面，并在输出错误和用户名已存在的时候自动清空输入框，使客户体验增强
    - 编辑页面
        - 在新建表单页面中，实现了对左侧mould-com子组件动态化，并对左侧icon进行封装了一个函数动态调用（后期改为使用组件图标引入）
        - 在新建表单页面中，实现了右侧PanelActionCom组件的事件绑定，并实现了预览，保存，完成创建三个按钮的功能
        - 完成了新建页面中问题框中下面工具栏组件的UI以及复制问题框的功能并解决了在新建表单中当复制问题框中ID会重复的问题
        - 多选题和单选题
            - 完成了多选题和单选题的新增和删除功能
    - 主页
        - 解决了是在主页新建表单还是在主页草稿跳转时路由携带参数ctgName
    - HeaderCom组件
        - 新增了预览页面的最顶部电脑和手机的图标，且只在预览页面展示
    - 预览页面
        - 完成了预览页面的所有功能
        - 完成了预览页面中电脑端的UI，手机端的UI由组员张自莲完成
    - 路由守卫
        - 完成了未登录时会跳转到登录页面而不是主页的路由守卫功能
    - 修复bug
        - 修复一：新增了个人中心的回退按钮，解决了个人中心无法返回上一页bug
        - 修复二：修改了预览页面电脑端按钮bug
        - 修复三：修复了预览页面下的完成创建按钮功能bug
        - 修复四：与组长易嘉木一同修复了只有新建表单的时候上面显示的是“新建表单”,编辑表单的时候应该显示对应的名称，表单结果页面也应该显示对于的名称
        - 修复五：修复了在填写页面的title和问题个数判空操作bug，与组长易嘉木一同修复了问题选项进行判空操作
        - 修复六：由于接口对于副标题也需要传值的原因，对填写页面下subtitle的判空bug进行了修复
        - 修复七：修复了对预览页面下的页面刷新按钮进行监测，按下的时候回到填写表单页面，但数据没有获取到
        - 修复八：修复了退出登录后路由守卫失效bug
- 陶睿：

    - 表单列表页面
        - UI设计
    - 个人中心页面
        - UI设计
        - 修改密码、修改头像弹窗
        - 修改密码，对输入密码进行逻辑判断，判断新密码与确认密码是否一致后再更新store
        - 修改昵称，修改用户的昵称，点击事件后更新store
        - 退出账号
    - 修复bug
- 许志超

    - header组件
        -      完成了header组件的ui以及业务，运用了插槽这一功能，不同的组件将展示不同内容；
    - 表单列表页面
        -     完成了表单列表页面中，发布业务以及表单动态化业务，可以实现表单的删除，编辑和收藏功能；
        -     实现了表单列表页面的的动态化，实现了实时获取表单数量，展示表单当前的收集状态（正在收集or结束收集），发布时间，同时可以动态展示收集的份数。可以根据用户要求只展示收藏的表单或者展示所有表单。

    - 新建页面
        -     完成了新建页面中，问题框中上面类型选项栏的UI以及更改问题框类型的功能，利用了问题之间类型的匹配，更改选项，改变问题类型，同时展示改变后的相应问题的内容。
        -     完成了通过点击左侧列表添加问题，以及复制，生成新问题时定位问题位置和获取焦点的初步逻辑（初始运用了vuex存储共用数据，后更改为provide实现）

    - 表单收集结果数据分析界面

        - 完成了表单收集结果数据分析界面的业务和ui，封装了新的分页器组件和时间格式化函数，运用了provide进行组件之间信息的传递，将收集表单的结果和当前展示的份数等数据分发给所需要的路由组件

    - 修复bug

        -     修复了表单问题下拉框遮住表单问题内容
- 周硕：

    - 登录页面
        - 实现了对登录页面进行基本功能设计，当输入的账号与密码正确匹配时，登录成功并且跳转到主页，若匹配失败，会显示账号或密码错误，将账号及其对应密码保存在vuex里面
    - 路由的部分修改
        - 对于部分路由的的修改，为部分路由添加了可变的参数，使其进行路由跳转时，显示对应id的页面
    - 结果分享页面
        - 对于表单结果的分享页面进行功能设计，获取到对应表单的数据，显示其标题，设计按钮可以直接复制此网站的连接用于分享
        - 对于表单结果的分享页面进行ui设计，通过首先利用ant-design找到相应的样式，对其进行调用，在将其改为自己设计的格式，取消对design的应用，再利用官网的样式对其进行修改至完成。
    - 结果问题页面
        - 对于表单结果的问题页面进行了功能设计，引用在里面引用表单填写的页面，设计按钮，但是利用isTrue判断此时在哪个页面
        - 对于表单结果的问题页面进行ui设计，直接按照官网的样式自行设计
    - 结果页面的设计
        - 对于表单结果页面进行总功能设计，在点击路由时成功跳转到对应id的表单的相关结果页面，本页与其子页面通过路由传递id
        - 对于表单结果页面ui进行设计，保持与官网样式一致
    - 日期题目的下拉时间选择栏
        - 对于下拉选择框的功能进行完善，保证选择对应选项后能进行双向绑定，并且将对应的选项绑定在对应的状态码上
        - 对于下拉框的ui进行编写，按照官网的样式直接进行编写
    - 时间题目的下拉时间选择栏
        - 对于下拉选择框的功能进行完善，保证选择对应选项后能进行双向绑定，并且将对应的选项绑定在对应的状态码上
        - 对于下拉框的ui进行编写，按照官网的样式直接进行编写
    - 修复bug
        - 对于手机端的预览页面底部未固定进行修改，利用fixed固定在底部，保持不动
        - 将表单分享页面的title从固定名字改成对应的问题标题
        - 对于手机端预览页面的按钮颜色样式进行修改
        - 对于header的头像与个人中心的头像不一致问题进行修复
        - 对于header里面点击头像的下拉框里面的退出登录按钮功能进行实现
        - 对于结果表单页面点击头像的下拉框显示优先级不足进行修复
        - 对于个人中心的修改头像的弹窗ui进行修复，将减少design组件的使用，并且将样式贴近于官网
- 张自莲：

    - UI
        - 参照官网完成了登录、注册、新建表单页面UI
        - 整改了手机预览样式
    - 修复bug
        - 对于创建表单页面左侧添加问题栏未固定进行修改，添加position: absolute

## 项目说明

### 技术选型

- 框架：Vue 3
- 语言：TS
- npm包及其作用
    - ant-design-vue：UI样式组件库
    - axios：XML请求库
    - nanoid：生成识别码ID
    - qrcode.vue：生成二维码
    - vuedraggable：拖拽组件

### 运行说明

```bash
$ npm i
$ npm run serve
```

## 每周(日)进度

### 0605

- 易嘉木
    - 添加了修改头像的功能
    - 添加了编辑表单页面中，当发生修改后刷新会提示用户保存的功能
- 贺维杰
    - 修复了退出登录后路由守卫失效bug

### 0604

- 易嘉木
    - 部署项目至服务器
    - 修复一些小bug

### 0603

- 易嘉木
    - 添加了提交表单成功的页面和响应的路由导航，
    - 添加了表单结果中，当不存在结果时，显示空白页面的页面
    - 重写了编辑表单页面中，切换问题类型的逻辑
    - 重写了管理常用题中，对问题的新增和编辑。（在编辑表单问题的基础上，对管理常用题中，编辑表单进行了专门修改。）
    - 解决了因为聚焦事件而出现的黑框框
    - 重写了常用题的添加逻辑，解决了编辑常用题会导致多出来一个常用题的问题。
    - 为表单结果页添加了路由缓存
    - 在编辑页面的必填问题上表星号
    - 为表单结果页，增添了当结果中存在空答案的情况的处理
    - 将ant组件库改为按需引入，大幅度提高了加载速度
    - 将路由的加载方式改为懒加载，提高了加载速度
    - 更换二维码的生成方式为服务器生成
    - 对选择题的选项进行判空

- 贺维杰
    - 修改了填写页面下subtitle的判空bug
    - 对预览页面下的页面刷新按钮进行监测，按下的时候回到填写表单页面，但数据没有获取到
- 周硕
    - 修改了个人中心更换头像时的弹窗ui

### 0602

- 易嘉木
    - 修正了表单列表页面收藏按钮的可操作性取消
    - 修正了分享页面二维码的地址指向
    - 添加了全局的滑动条样式

- 贺维杰
    - 修复了预览页面下的完成创建按钮功能bug
    - 修复了在填写页面的title和问题个数判空操作bug
    - 修复了在新建表单还是编辑表单时的对应的名称bug

- 周硕
    - 修改了结果页面挡住header里面的下拉款问题

### 0601

- 易嘉木
    - 完成了编辑页面编辑的功能，包括
        - 常用的排序
        - 修改常用题的结构
        - 增加并编辑新的常用题
- 周硕
    - 修改了分享页面标题显示bug
- 贺维杰
    - 新增了个人中心的回退按钮，解决了个人中心无法返回上一页bug
    - 修改了预览页面电脑端按钮bug

### 0531

- 易嘉木
    - 完成了编辑页面中，对常用题的添加，删除功能
    - 实现了编辑页面中，对选项题选项的拖拽功能的实现
    - 修改了填写表单中下拉框的样式
    - 重写了用户中心的样式以及业务逻辑
- 贺维杰
    - 完成了预览页面的功能及样式调整
- 张自莲
    - 整改了手机预览样式
- 周硕
    - 修改了分享页面标题显示bug

### 0530

- 易嘉木
    - 完成了填写表单页面中的UI页面以及业务
        - 添加了填空题，单选题，多选题，下来选择题，日期，时间，分数题的样式以及逻辑
    - 使用replace解决了在表单结果页面子路由之间跳转会压入history的问题
    - 完善了各个页面之间的路由，以及路由传参的关系
    - 使用第三方接口，实现了分享页中实时可用的二维码
- 周硕：
    - 修改了问题的题目类型选择下拉列表样式问题

### 0529

- 易嘉木
    - 重写了通过点击左侧列表添加问题的方式
        - 使用scrollIntoView保证添加问题后，视口居中
        - 使用ref取代自定义事件
        - 更改触发实际为watch + beforeUpdata
        - 将currentProblemsID从Vuex改回provide
- 周硕：
    - 修改了日期和时间列表的下拉选择时的焦点丢失问题以及样式问题

### 0528

- 贺维杰：
    - 完成了未登录时会跳转到登录页面而不是主页的路由守卫功能

- 易嘉木
    - 更新了编辑表单页面中通过左侧添加题目方式增加题目的方式的种类，现在可以七种方式都可以添加了
    - 修复了点击创建表单，进入编辑表单页面后，无法增加题目的BUG
    - 修复了当新建问题时，点击完成创建/保存无法成功发布，即startForm 和 delForm调用的顺序错误

- 陶睿：
    - 改进修改密码、修改昵称逻辑：发送数据包、旧密码和登录密码是否一致、新密码和确认新密码是验证是否一致和正则匹配

### 0527

- 易嘉木：
    - 封装了分页器UI组件
- 贺维杰：
    - 完成了预览页面的电脑端部分，并完成其功能和样式

- 周硕：
    - 修改部分路由以添加参数传递功能

- 陶睿：
    - 个人中心页面改为TS + setup写法：修改密码、修改昵称模块

### 0526

- 易嘉木：
    - 为新建表单页面，使用 vue.draggable 组件增加了通过拖拽改变问题顺序的功能。
- 贺维杰：
    - 解决了是在主页新建表单还是在主页草稿跳转时路由携带参数问题

- 周硕：
    - 完成结果的问题页面基本功能设计以及通过官网的样式设计UI

- 张自莲：
    - 引入适配vue3的ant-design图标，修改了登录、注册的背景，补充和修改新建表单的UI界面；

- 陶睿：
    - 修改个人中心UI界面：增加修改头像弹窗，增加transition效果

### 0524

- 易嘉木：

  独自完成版本更改以及项目重构，并对重构前的所有函数以及数据进行修改，以增强运行效率和复用性：

    - 版本更改

        - Vue版本：vue2 ->vue3
            - 由选型式API更改为组合式API；
            - 组件传值改为以provide/inject为主要形式；
        - 编程语言：JS -> TS
            - 重新用TS封装Axios；
            - 编写接口；

    - 重构项目结构

        - 新建表单页面，
            - 提取公共HTTP请求，使请求次数最小化，并使用provide/inject，以减少重复请求，减少重复props
            - 预览页面和编辑页面，改为同一路由下的子路由，跳转时无需重新请求，加快跳转速度
        - 表单列表页面，
            - 修改组件的嵌套关系
        - 填写表单页面
            - 将具体的填写内容组件单独提出来，以提供给预览、填写详情的问题页面复用

- 周硕：

    - 根据官网完成了表单结果页面中的表单分享页面的UI设计

- 贺维杰：

    - 解决了新建表单中复制问题框中ID重复的问题；

### 0521

- 贺维杰：
    - 完成了新建页面中问题框中下面工具栏的UI以及复制问题框的功能。

- 许志超：
    - 完成了新建页面中问题框中上面类型选项栏的UI以及更改问题框类型的功能。

- 周硕：
    - 完成了表单结果页面中的表单分享页面的基础功能

### 0519

- 易嘉木：
    - 完善了表单列表的UI页面
    - 实现了表单列表页面的动态渲染，
    - 实现了表单列表中，根据不同的表单提供不同的表单状态效果
    - 优化了用户使用体验，全项目增加了用户操作提示；
- 张自莲：完善了登录，注册和新建表单的UI界面；
- 陶睿：改进个人中心的UI页面；
- 周硕：根据官网的样式，完成了表单结果页面的UI；

### 0518

- 易嘉木：
    - 完成了填写表单页面的UI页面；
    - 完成了填写表单页面的动态渲染；
- 许志超：实现了表单列表页面的的动态化，实现了实时获取表单数量；
- 周硕：完成了表单结果页面的初始化业务；
- 陶睿：完成了个人中心的UI页面；
- 许志超：完成了表单列表页面中，发布业务以及表单动态化业务；

### 0517

- 易嘉木:
    - 编写了新建表单的UI页面；
- 张自莲:
    - 修复了登录与注册的UI页面中出现的bug；
- 贺维杰：
    - 新建表单页面中，实现了左侧mould-com子组件动态化，
    - 实现了右侧action-com组件的事件绑定，并对左侧icon封装了一个函数以调用；
- 陶睿：
    - 完成了表单列表的UI页面；

### 0516

- 易嘉木:
    - 合并并修复了登陆页面，注册页面，全局组件header的bug，
    - 更改了调用接口的方式，不需要传入一个对象，而是只需要传入参数即可；
- 张自莲:
    - 完成登录与注册的UI页面；

### 0515

- 易嘉木:
    - 完成了Vuex仓库的基本配置，
    - 使用Axios封装了http请求，并二次封装了Axios
    - 构建了登陆，注册，新建表单，表单列表，结果查询等页面的路由；
- 许志超:
    - 完成了header的UI以及业务；
- 周硕:
    - 完成了登陆的业务，利用封装好的api进行调用；
- 贺维杰：
    - 完成了注册的业务；

## 问题与解决方法

### 问题 一：复制时ID重复

> ```
> 在编辑表单界面，因为是通过表单ID来进行逻辑判断，但是使用Object.assign进行复制，但是这样是会导致ID重复，会出现意想不到的错误，
> ```

解决方法：

我们引入了 Nano ID 来为我们设置独一无二的ID以区分。

### 问题 二：添加新的问题时，丢失当前选择问题的焦点

解决方法：

为添加问题按钮的mousedown事件绑定prevent

```ts
@mousedown.prevent
```

### 问题 三：创建新问题时，获取焦点混乱

##### 解决方式一

使用自定义事件

```ts
  directives: {
    "my-focus": {
      updated(item, binding) {
        // console.log(item)
        if (binding.value == store.state.currentProblemId) {
          item.focus();
          console.log(item)
        }
      },
    },
  },
```

这种方式可以在改变数据的时候获取焦点，但是有一些问题

问题一：由于是在在update生命周期实现，导致用户输入等操作也会导致聚焦，影响用户操作

问题二：由于自定义事件需要在setup外层定义，导致本应定义在edit组件中的变量currentProblemId被迫改至vuex中才能拿到。

##### 解决方式二：

```ts
<div class="problem-set"
    tabindex="1"
    @focus="choiceProblem(problemItem.id)"
    @blur="loseProblem"
    ref="itemRef"
>
        
……

onUpdated(()=>{
    if(problemItem.value.id === store.state.currentProblemId){
        console.log("before",store.state.currentProblemId)
        itemRef.value.focus()
     	console.log("after",store.state.currentProblemId)
    }
})
```

只需要在每次初始化一个问题组件时，用ref，拿到对应的DOM元素，然后聚焦即可，这样每次只会触发一次，不影响用户输入，并且是存放在setup,不需要使用Vuex增加额外性能损耗。

### 问题四：关于使用Ant Design vue 模式框修改样式无效的问题

解决方式：

```HTML
    <div class="modal" ref="modal">
      <a-modal v-model:visible="visible"
               title="管理常用题"
               @ok="handleOk"
               :footer="null"
               :getContainer = '()=>$refs.modal'
      >
      </div>
```

使用getContainer将div 挂载到外层DIV上

### 问题五：由于我们使用焦点事件来作为我们插入问题的核心逻辑，所以会出现聚焦在奇怪的地方导致无法正确的插入问题，改问题暂时没有得到有效解决
