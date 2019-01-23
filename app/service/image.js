const {Service} = require('egg');
const fs = require('fs');
const path = require('path');
const awaitStreamReady = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const imagesTool = require('images');

class ImageService extends Service {
    /**
     * 上传图片
     * @param stream
     * @param moduleNames
     * @returns {Promise<{filename: string}>}
     */
    async uploadImage(stream, ...moduleNames) {
        const dirPathTemp = this.ctx.helper.makeDir(true, ...moduleNames);
        const dirPathDefault = this.ctx.helper.makeDir(false, ...moduleNames);
        const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
        const targetTemp = path.join(dirPathTemp, filename);
        const writeStream = fs.createWriteStream(targetTemp);
        const targetDefault = path.join(dirPathDefault, filename);
        try {
            // 写入文件
            await awaitStreamReady(stream.pipe(writeStream));
            setTimeout(async () => {
                await imagesTool(targetTemp)
                    .save(targetDefault, {
                        quality: 50
                    });
            })
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            imagesTool.gc();
            throw err;
        }
        return {
            mimeType: stream.mimeType,
            filename
        };
    }

}

module.exports = ImageService;

