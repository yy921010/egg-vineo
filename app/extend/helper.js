const fs = require('fs');
const path = require('path');

module.exports = {
    makeDir(moduleItem) {
        const dirPathName = path.join(this.config.baseDir, this.config.upload.path, moduleItem);
        if (!fs.existsSync(dirPathName)) {
            fs.mkdirSync(dirPathName)
        }
        return dirPathName
    },
    /**
     * 删除文件夹
     * @param path
     */
    deleteDir(path) {
        let files = [];
        //判断给定的路径是否存在
        if (fs.existsSync(path)) {
            //返回文件和子目录的数组
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let curPath = path.join(path, file);
                //同步读取文件夹文件，如果是文件夹，则函数回调
                if (fs.statSync(curPath).isDirectory()) {
                    this.deleteDir(curPath);
                } else {
                    fs.unlinkSync(curPath);    //是指定文件，则删除
                }
            });
            fs.rmdirSync(url); //清除文件夹
        } else {
            this.logger.info("给定的路径不存在！");
        }
    },
    /**
     *
     * @param name
     * @param path
     */
    deleteFileByName(name, path) {
        let files = [];
        //判断给定的路径是否存在
        if (fs.existsSync(path)) {
            //返回文件和子目录的数组
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let curPath = path.join(path, file);
                //同步读取文件夹文件，如果是文件夹，则函数回调
                if (fs.statSync(curPath).isDirectory()) {
                    this.deleteFileByName(curPath, name);
                } else {
                    //是指定文件，则删除
                    if (file.indexOf(name) > -1) {
                        fs.unlinkSync(curPath);
                        this.logger.info("删除文件：" + curPath);
                    }
                }
            });
        } else {
            this.logger.info("给定的路径不存在：");
        }
    }
};
