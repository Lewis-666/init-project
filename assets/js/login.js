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
})