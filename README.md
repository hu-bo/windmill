# windmill
风车发电模型
<a href="http://www.luuxii.com/job/three/">点击查看效果</a>


## 目录结构

```bash
├── /build/          # webpack配置文件
├── /config/         # dev 和 build server配置: 本地环境端口，build出口配置等
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /assets/       # 静态资源
│ ├── /components/   # UI组件及UI相关方法
│ ├── /plugins/      # 插件
│ ├── /router/       # 路由
│ ├── /three/        # threejs
│ │ ├── /camera/     # three之一 相机，相当于人眼角色
│ │ ├── /controls/   # 控制器，与人交互的工具，拖拽，点击什么的
│ │ ├── /helpers/    # 帮助开发three的工具
│ │ ├── /loaders/    # 外部模型加载器
│ │ ├── /renderer/   # 渲染器
│ │ ├── /scene/      # 场景(容器，相当于一个空白的世界)
│ │ ├── /scenes/     # 所有的场景
│ │ │ ├── /floor/    # 地板
│ │ │ ├── /linght/   # 灯光
│ │ │ ├── /sky/      # 天空
│ │ │ └── /windmill/ # 风车
│ │ └── index.js     # three.js入口文件
│ ├── /utils/        # 工具函数
│ ├── /views/        # 页面
│ ├── App.css        # 公共样式
│ ├── App.js         # 主页
│ └── main.js        # 入口文件
├── index.html       # index模板文件
## Build Setup

``` bash
# 安装依赖包
yarn

# 启动开发环境服务
yarn start

# 打包项目
yarn run build
