const {Service} = require('egg');
const fs = require('fs');
const path = require('path');
const awaitStreamReady = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class ImageService extends Service {
    /**
     * 上传图片
     * @param stream
     * @param moduleNames
     * @returns {Promise<{filename: string}>}
     */
    async uploadImage(stream, ...moduleNames) {
        let dirPathName = '';
        let pathChild = '';
        moduleNames.forEach((moduleItem) => {
            pathChild = pathChild.concat(`${moduleItem}/`);
            dirPathName = path.join(this.config.baseDir, this.config.upload.path, pathChild);
            this.logger.info(dirPathName);
            if (!fs.existsSync(dirPathName)) {
                fs.mkdirSync(dirPathName)
            }
        });
        const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
        const target = path.join(dirPathName, filename);
        const writeStream = fs.createWriteStream(target);
        try {
            // 写入文件
            await awaitStreamReady(stream.pipe(writeStream));
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }
        return {
            mimeType: stream.mimeType,
            filename
        };
    }

}

module.exports = ImageService;

