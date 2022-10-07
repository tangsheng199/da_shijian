$(function(){
    // 点击注册
    $('#registerID').on('click',function(){
       $('.register_box').show()
       $('.login_box').hide()
    })

    // 点击登录
    $('#loginID').on('click',function(){
        $('.login_box').show()
        $('.register_box').hide()
    })

    // 从layui 获取 form 对象 
    let form =layui.form
    // 通过form.verify()来自定义校验规则
    form.verify({
        // 自定义了一个 pwd 的校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   校验两次密码是否一致的规则
        repwd: function(value){
            // 1，通过形参拿到确认密码框的内容(形参就是value)
            // 2，还需要拿到密码框中的内容
            // 3，让后进行一次等于判断
            // 4，如果判断失败，return一个提示消息即可
            
            // 拿到密码框里的值
           let pwd = $('.register_box [name=password]').val()
            // 判断
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })


    // 监听 注册表单 的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // // 获取用户名和密码数据
        // let username = $('#form_reg [name=username]').val()
        // let password = $('#form_reg [name=password]').val()
        
        let data = {
            username : $('#form_reg [name=username]').val(),
            password : $('#form_reg [name=password]').val()
        }
        // 发起ajax POST注册 请求
        $.ajax({
            method:'POST',
            // url:'http://big-event-api-t.itheima.net/api/reguser',
            url:'/api/reguser',
            // data:{
            //     username,
            //     password
            // },
            data:data,
            success(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录')
                // 模拟点击事件
                $('#loginID').click()
            }
        })
    })


    // 监听 登录表单 提交事件
    $('#form_login').on('submit',function(e){
    
        // 阻止默认提交事件
        e.preventDefault()
        // 发起 ajax POST登录 请求
        $.ajax({
            method:'POST',
            // url:'http://big-event-api-t.itheima.net/api/login',
            url:'/api/login',
            // 通过jq里的 serialize（）函数快速获取表单里的信息
            data:$(this).serialize(),
            success(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                // layer.msg(res.message)
                // console.log(res.token);
                layer.msg('登录成功')
                // 将登录成功得到的 token字符串 存储到本地
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})