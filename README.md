# lazybones
用于实现图片懒加载（分页加载）的 jQuery 插件

## 浏览器兼容

该插件（模块）兼容 `chrome`、`Firefox`、`IE8+`、`Safari` 等众多主流浏览器。

## 使用

#### 作为jQuery扩展插件
    <html>
    <body>
      <img src="http://www.gratisography.com/img/rabbit.gif" data-lazybones-url="http://www.gratisography.com/pictures/429_1.jpg">
    </body>
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script src="../jquery.lazybones.js"></script>
    <script>
      $(function () {
        $.lazybones();
      });
    </script>
    </html>


#### 作为CMD模块
    var lazybones = require('../jquery.lazybones.js');
    lazybones();

#### 作为AMD模块
    define('test', ['../jquery.lazybones.js'], function(lazybones){
      lazybones();
    });


## API

#### lazybones
+ 方法说明: 用于初始化，将所有的符合条件的图片进行登记，并进行懒加载

+ 参数列表: 该方法接受一个 `json` 对象作为参数, `json` 对象支持的属性如下
    * attr:      `String` 类型，可选参数，指定 `img` 真实路径的属性名称，默认为`data-lazybones-url`，有该属性的图片才会被组件登记并进行懒加载。
    * event:     `String` 类型，可选参数，触发自动计算并加载图片的事件名，默认为 `scroll`。
    * container: `Object` 类型，可选参数，用于指定触发 `event` 事件的容器对象，默认为 `Window`。
    * callback:  `Function` 类型，可选参数，每一次计算并加载图片之后的回调函数。
    * autoBegin:  `Boolean` 类型，可选参数，初始化之后是否自动开始监听事件，默认为 `true`。

+ 返回值
    * 类型: `Object`
    * 说明: 返回 **api** 自身，方便链式调用。

#### isListening
+ 方法说明: 用于判断是否处于监听状态

+ 参数列表: 无

+ 返回值
    * 类型: `Boolean`
    * 说明: 是否处于监听状态。
    
#### getRemains
+ 方法说明: 获取尚未被加载的图片数量

+ 参数列表: 无

+ 返回值
    * 类型: `Number`
    * 说明: 尚未被加载的图片数量。

#### load
+ 方法说明: 向指定对象(窗口)发送消息

+ 参数列表:
    * elements: `Array` 数组，可选参数，需要选择加载的图片集合，如果没有该参数，则对所有的图片位置进行计算，选择性加载。
    * callback: `Function` 类型，可选参数，选择性加载图片之后的回调函数。

+ 返回值
    * 类型: `Boolean`
    * 说明: 是否成功加载了图片。

#### stopListening
+ 方法说明: 停止事件监听，即停止尚未加载图片的加载

+ 参数列表: 无

+ 返回值
    * 类型: `Object`
    * 说明: 返回 **api** 自身，方便链式调用。

#### beginListening
+ 方法说明: 开始事件监听，即对尚未加载图片重新启动按需加载

+ 参数列表: 无

+ 返回值
    * 类型: `Boolean`
    * 说明: 是否重启成功，或者是否需要重启。比如所有图片已经被加载或者正在监听中的话就不需要重启。