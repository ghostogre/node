const validator = require('validator');
const isEmpty = require('./isEmpty');
module.exports = {
  validateRegister(data) {
    data.name = isEmpty(data.name)? '': data.name;
    data.password = isEmpty(data.password)? '': data.password;
    data.email = isEmpty(data.email)? '': data.email;
    if (!validator.isLength(data.name, {min: 6, max: 12})) {
      return '名字长度不能小于6位并且不能超过12位'
    }
    if (!validator.isEmail(data.email)) {
      return '邮箱不合法！'
    }
    if (validator.isEmpty(data.password)) {
      return '密码不能为空'
    }
    if (!validator.isLength(data.password, {min: 7, max: 20})) {
      return '密码必须为8到20位之间'
    }
    return false
  },
  validateLogin(data) {
    data.password = isEmpty(data.password)? '': data.password;
    data.email = isEmpty(data.email)? '': data.email;
    if (validator.isEmpty(data.email)) {
      return '邮箱不能为空'
    }
    if (!validator.isEmail(data.email)) {
      return '邮箱不合法！'
    }
    if (validator.isEmpty(data.password)) {
      return '密码不能为空'
    }
    if (!validator.isLength(data.password, {min: 7, max: 20})) {
      return '密码必须为8到20位之间'
    }
    return false
  }
}
