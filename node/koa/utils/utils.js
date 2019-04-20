const bcrypt = require('bcryptjs');
const util = {
  // 验证邮箱
  checkEmail(email) {
    return (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email))
  },
  // 加密
  bcryptjs(pwd) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pwd, salt);
    return hash;
  },
  // 匹配密码
  compare(upwd, pwd) {
    return bcrypt.compareSync(upwd, pwd);
  }
}

module.exports = util;
