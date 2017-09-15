# lazybones
用于实现图片懒加载（分页加载）的 jQuery 插件

## 浏览器兼容

该插件（模块）兼容 `chrome`、`Firefox`、`IE8+`、`Safari` 等众多主流浏览器。

## 使用

#### 作为jQuery扩展插件
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script src="../jquery.lazybones.js"></script>
    <script>
      $(function () {
        $.lazybones();
      });
    </script>

#### 作为CMD模块
    var lazybones = require('../jquery.lazybones.js');
    lazybones();

#### 作为AMD模块
    define('test', ['../jquery.lazybones.js'], function(lazybones){
      lazybones();
    });


## API
#### isListening
#### getRemains
#### load
#### stopListening
#### beginListening