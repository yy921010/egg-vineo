const {Service} = require('egg');
const fs = require('fs');
const path = require('path');
const awaitStreamReady = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class ImageService extends Service {
    /**
     * 上传图片
     * @param stream
     * @returns {Promise<void>}
     */
    async uploadImage(stream, moduleName) {
        const pathName = 'app/public/upload';
        const dirName = dayjs(Date.now()).format('YYYYMMDD');
        const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
        const dirPathName = path.join(this.config.baseDir, pathName, moduleName);
        this.logger.info(dirPathName);
        if (!fs.existsSync(dirPathName)) {
            fs.mkdirSync(dirPathName)
        }
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
        return stream;
    }
}

module.exports = ImageService;

