const fs = require('fs');
const path = require('path');

module.exports = {
    makeDir(moduleItem) {
        const dirPathName = path.join(this.config.baseDir, this.config.upload.path, moduleItem);
        if (!fs.existsSync(dirPathName)) {
            fs.mkdirSync(dirPathName)
        }
        return dirPathName
    }
};
