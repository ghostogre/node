const User = require('../models/User')
// 获取全球公认游戏头像
const gravatar = require('gravatar')
const utils = require('../utils/utils')
// 生成token
const jwt = require('jsonwebtoken')
// 证书
const keys = require('../config/keys')
module.exports = {
  // 注册用户
  register: async(name, password, email) => {
    const account = await User.find({email})
    if (account.length === 0) {
      let returnVal
      const avatar = gravatar.url(email, {s: 200, r: 'pg', d: 'mm'})
      const newUser = new User({
        name,
        email,
        avatar,
        password: utils.bcryptjs(password)
      })
      await newUser.save().then(data => {
        returnVal = {
          errcode: 0,
          data,
          errmsg: '注册成功!'
        }
      }).catch(err => {
        returnVal = {
          errcode: 10003,
          errmsg: '注册时出错!'
        }
        console.log(err)
      })
      return returnVal
    } else {
      return {
        errcode: 10004,
        errmsg: '用户名称已存在!'
      }
    }
  },
  // 登录
  login: async(email, password) => {
    const account = await User.find({ email })
    if (account.length === 0) {
      return {
        errcode: 10005,
        errmsg: '没有注册该邮箱!'
      }
    } else {
      let user = account[0]
      let isCorrect = utils.compare(password, user.password)
      if (isCorrect) {
        const payload = { id: user.id, email: user.email}
        // 1. 什么信息放入token 2. 关键字 3. 过期时间
        const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 })
        return {
          errcode: 0,
          data: {
            token
          },
          errmsg: '登录成功'
        }
      } else {
        return {
          errcode: 10006,
          errmsg: '密码错误'
        }
      }
    }
  }
}