const bcrypt = require('bcryptjs');
const util = {
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
