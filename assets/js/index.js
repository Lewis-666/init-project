$(function () { 
  // 调用函数getUserInfo()获取用户基本信息
  getUserInfo()


  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1.清空本地存储中的token
      localStorage.removeItem('token')
      // 2.重新跳转到登录页面
      location.href = '/login.html'
      // 关闭confirm询问框
      layer.close(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  // 调了这个函数就该发起请求了,
  $.ajax({
    method: 'GET',
    // 不要忘了调用拼接根路径的baseAPI文件
    url: '/my/userinfo',
    // 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    // 指定成功的回调
    success: function (res) {
      if (res.status !== 0) {
        // 利用layui里边layer弹消息
        return layui.layer.msg('获取用户信息失败')
      }
      // 封装一个函数为渲染头像的方法。因为在这里写步骤多
      // renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用complete这个回调函数
    // complete: function (res) {
      // console.log('执行了complete回调');
      // console.log(res);
      // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
      // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //   // 1.强制清空token
      //   localStorage.removeItem('token')
      //   // 2.强制跳转到登录页面
      //   location.href = '/login.html'
      // }
    // }

  })
}
// 渲染用户头像
function renderAvatar(user) {
  // 获取用户名称
  var name = user.nickname || user.username
  // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // attr(属性名， 属性值)
    $('.layui-nav-img').attr('src', user.user_pic).show()//显示图片头像
    $('.text-avatar').hide()//隐藏文本头像
  } else {

    $('.layui-nav-img').hide()
    // toUpperCase()转成大写
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}