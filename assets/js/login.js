$(function(){
    // 点击注册
    $('#registerID').on('click',function(){
       $('.register_box').hide()
       $('.login_box').show()
    })

    // 点击登录
    $('#loginID').on('click',function(){
        $('.login_box').hide()
        $('.register_box').show()
    })
})





// 需要从 layui 对象身上 取到foorm
const form = layui.form

form.veerify ({
    // 添加定义规则
    pwd: [/^[\s]{6,12}$/,'密码必须是6到12位，且不能出现空格'],
    //确认密码框
    repwd: function(value){
        // 拿到密码框和再次确认密码作比较
        // 属性选择器： $('[name=xxx]').val()
        if ($('#password').val() === value) {
            return '两次没密码不一致，请重新输入'
        }
    }
})




// 给注册表添加提交事件（会刷新游览器）
// /$('#formReg).submit(function(){})

$('#formLogin').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        methhod:'POST',
        url:'http://big-event-vue-api-t.itheima.net/api/login',
        conntentTyppe:'application/json',
        data:format2Json($(this).serialize()),
        success(res){
            if(res.code !== 0) return layer.msg(res.message)
            // token 意思是令牌 （下一次去请求权限的接口的时候带着）
            localStorage.setItem('big_news_token',res.token)
            // 固定写法 ： Bearer token字符串 Bearer意为持票人拿着token去请求
            location.href ='/home.html'
        }
    })
})