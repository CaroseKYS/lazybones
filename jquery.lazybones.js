/*!
 * jquery.lazybones.js
 * by kangys
*/
(function($) {
  var elesGroup = {};
  var remains;
  var isInited = false;
  var _isListening = false;
  var defaultOptions;
  var params;
  var $eles;
  /*初始化参数*/
  defaultOptions = {
    attr: "data-lazybones-url",
    event: "scroll",
    container: $(window),
    callback: $.noop,
    autoBegin: true
  };

  defaultOptions.selector = '[' + defaultOptions.attr + ']'

  if ($) {
    $.extend({
      lazybones: function (options) {
        lazybones(options);
      }
    });
  }

  if ( typeof define === "function" && define.cmd ) {
    define( __seajs_mod_id__, [], function(require, exports, module) {
      $ = require('jquery') || $;
      module.exports = lazybones;
    });
  }else if ( typeof define === "function" && define.amd ) {
    define( "cwmsg", ['jquery'], function($1) {
      $ = $1 || $;
      return lazybones;
    });
  }

  function lazybones(options) {
    if (isInited) {
      return;
    }

    params = $.extend({}, defaultOptions, options || {});

    /*获取当前对象控制的元素*/
    $eles = $(params.selector);
    remains = $eles.length;
    getGroup($eles);

    params.autoBegin && lazybones.beginListening();
  }

  lazybones.isListening = function () {
    return _isListening;
  };

  lazybones.getRemains = function () {
    return remains;
  };

  lazybones.load = function (eles, callback) {
    if (!isInited) {
      lazybones();
    }

    var _elesGroup = elesGroup;
    var len = arguments.length;
    
    if (len == 2) {
      _elesGroup = getGroup(eles);
    }else if (len == 1) {
      if (Object.prototype.toString.call(eles).toLowerCase() === '[object function]') {
        callback = eles;
      }else{
        _elesGroup = getGroup(eles);
        callback = params.callback;
      }
    }else{
      callback = params.callback;
    }

    return checkOnce(_elesGroup, callback);
  };

  lazybones.stopListening = function(){
    _isListening = false;
    params.container.unbind(params.event, checkOnce);
    return lazybones;
  };

  lazybones.beginListening = function () {
    if (remains == 0) {
      return false;
    }

    if (_isListening) {
      return true;
    }

    _isListening = true;
    params.container.bind(params.event, function(){
      checkOnce(elesGroup, params.callback);
    });

    checkOnce();
    return true;
  };

  function checkOnce(group, callback) {
    if (!_isListening) {
      return false;
    }
    group = group || elesGroup;

    var result = loading(params.container, group);
    remains = result.remains;

    (remains == 0) && params.container.unbind(params.event, checkOnce);

    callback = callback || params.callback;
    callback(result);

    return true;
  }

  function getGroup(eles){
    var group = {};
    var ele, $ele, url;
    
    eles = eles || [];

    for (var i = 0, len = eles.length; i < len; i++) {
      ele = eles[i];
      $ele = $(ele);
      url = $ele.attr(params["attr"]);

      elesGroup[url] = elesGroup[url] || [];

      if (!$ele.data('lazybones-grouped')) {
        $ele.data('lazybones-grouped', true);
        elesGroup[url].push(ele);
      }

      group[url] = elesGroup[url];
    }

    return group;
  }

  function loading(container, groups) {
    var $container = $(container);
    var contop;
    var contHeight = $container.height();
    var remainElesGroupCont = 0;
    var groupsBeDeleted = {};

    if ($container.get(0) === window) {
      contop = $container.scrollTop();
    } else {
      contop = $container.offset().top;
    }   
    
    for (var url in groups) {
      if (!groups.hasOwnProperty(url)) continue;

      if (handleEleGroup(contHeight, contop, url, groups[url])) {
        groupsBeDeleted[url] = groups[url];
        delete groups[url];
        continue;
      }

      remainElesGroupCont ++;
    }

    return {
      remains: remainElesGroupCont,
      loadedGroups: groupsBeDeleted
    };
  }

  function handleEleGroup(contHeight, contop, url, eles) {
    var i, len = eles.length, ele, $ele, tag, post, posb, isOneEleShown = false, ifLoaded;

    /*判断在当前组是否有一个元素需要被处理*/
    for (i = 0; i < len; i++) {
      ele  = eles[i];
      $ele = $(ele);

      if (!$ele.is(':visible'))continue;

      post = $ele.offset().top - contop;
      posb = $ele.height();

      if ((post > 0 && post <= contHeight) || (post <= 0 && post + posb > 0)) {
        isOneEleShown = true;
        break;
      }
    }

    /*如果没有元素需要被处理，则直接返回*/
    if (!isOneEleShown) {
      return isOneEleShown;
    }

    /*如果有一个元素需要被处理, 则该组所有元素都被处理*/
    for (i = 0; i < len; i++) {
      ele  = eles[i];
      $ele = $(ele);
      tag  = ele.nodeName.toLowerCase();
      ifLoaded = $ele.data('lazybones-loaded') || false;

      if(ifLoaded) continue;
      $ele.data('lazybones-loaded', true);

      //在浏览器窗口内
      if (tag === "img") {
        //图片，改变src
        $ele.attr("src", url); 
      } else {
        $ele.load(url, {}, function() {});
      }

      $ele.removeAttr(params.attr); 
    }

    return isOneEleShown;
  }

})(jQuery);