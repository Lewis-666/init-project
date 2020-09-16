$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.red-box').show()
  })

  // 点击登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.red-box').hide()
  })

  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过这个形参拿到的是确认密码框的内容
    // 还需要拿到密码框的内容
    // 然后进行一次等于的判断
    // 若判断失败则return一个提示消息
      
      var pwd = $('.red-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
    
  })


  // 监听表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 先阻止默认的提交行为
    e.preventDefault()
    // 在发起ajax的post请求
    $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
      if (res.status !== 0) {

        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        layer.msg('登录成功')
        // 将登录成功得到的token字符串保存到localStorage中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})