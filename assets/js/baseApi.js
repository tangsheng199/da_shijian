// 每次发起ajax请求都会经过的地方
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数里，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(option){
    // 在发起真正的 ajax 请求之前 ，统一拼接请求的根路径
    option.url = 'http://big-event-api-t.itheima.net' + option.url
    console.log(option.url);
})