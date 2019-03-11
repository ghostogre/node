const path = require("path");
const fs = require('fs');

module.exports = function (opts) {
  let {app, rules = []} = opts;
  if (!app) {
    throw new Error('the app params is necessary!');
  }
  const appkeys = Object.keys(app);
  rules.forEach((item) => {
    let {folder, name} = item;
    if (appkeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`);
    }
    let content = {};
    // 读取指定文件夹下(dir)的所有文件并遍历
    fs.readdirSync(folder).forEach(filename => {
      // 取出文件的后缀
      let extname = path.extname(filename);
      // 只处理js文件
      if (extname === '.js') {
        // 将文件名去除后缀
        let name = path.basename(filename, extname);
        //读取文件中的内容并赋值绑定
        content[name] = require(path.join(folder, filename));
      }
    });
    app[name] = content
  })
}
