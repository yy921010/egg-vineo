'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  /**
     * 创建初始化文件：upload, .temp
     */
  makeDirInit() {
    const uploadFiles = this.config.upload;
    for (const fileKey of Object.keys(uploadFiles)) {
      const dirPathName = path.join(this.config.baseDir, uploadFiles[fileKey]);
      if (!fs.existsSync(dirPathName)) {
        fs.mkdirSync(dirPathName);
      }
    }
  },

  makeDir(isTEMP, ...fileNames) {
    this.makeDirInit();
    // 编写初始文件
    let dirPathName = '';
    let pathChild = '';
    fileNames.forEach(fileName => {
      const uploadFile = isTEMP ? this.config.upload.temp : this.config.upload.path;
      pathChild = pathChild.concat(`${fileName}/`);
      dirPathName = path.join(this.config.baseDir, uploadFile, pathChild);
      if (!fs.existsSync(dirPathName)) {
        fs.mkdirSync(dirPathName);
      }
      this.logger.info(dirPathName);
    });
    return dirPathName;
  },
  deleteDir(pathName) {
    let files = [];
    // 判断给定的路径是否存在
    if (fs.existsSync(pathName)) {
      // 返回文件和子目录的数组
      files = fs.readdirSync(pathName);
      files.forEach(file => {
        const curPath = path.join(pathName, file);
        // 同步读取文件夹文件，如果是文件夹，则函数回调
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteDir(curPath);
        } else {
          // 是指定文件，则删除
          fs.unlinkSync(curPath);
        }
      });
      // 清除文件夹
      fs.rmdirSync(pathName);
    } else {
      this.logger.info('给定的路径不存在！');
    }
  },

  deleteFileByName(name, pathName) {
    let files = [];
    // 判断给定的路径是否存在
    if (fs.existsSync(pathName)) {
      // 返回文件和子目录的数组
      files = fs.readdirSync(pathName);
      files.forEach(file => {
        const curPath = path.join(pathName, file);
        // 同步读取文件夹文件，如果是文件夹，则函数回调
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteFileByName(curPath, name);
        } else {
          // 是指定文件，则删除
          if (file.indexOf(name) > -1) {
            fs.unlinkSync(curPath);
            this.logger.info('删除文件：' + curPath);
          }
        }
      });
    } else {
      this.logger.info('给定的路径不存在：');
    }
  },
};
