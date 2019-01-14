const Controller = require('./base_controller');

class ImageController extends Controller {
    async index() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();

        const file = ctx.service.image.uploadImage(stream, 'blog');
        this.success(file.fields);
    }
}

module.exports = ImageController;
