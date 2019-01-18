const Controller = require('./base_controller');

class ImageController extends Controller {

    async index() {
        this.success({});
    }

    /**
     * 上传图片
     * @returns {Promise<void>}
     */
    async create() {
        const stream = await this.ctx.getFileStream();
        const {fields: {moduleName, id}} = stream;
        const {filename, mimeType} = await this.ctx.service.image.uploadImage(stream, moduleName, id);
        this.success({
            type: mimeType,
            name: filename,
            moduleName,
            id
        });
    }

    async destroy() {
        const {id} = this.ctx.params;
    }
}

module.exports = ImageController;
