const Controller = require('./base_controller');

class ImageController extends Controller {
    async index() {
        const ctx = this.ctx;
        const {ident} = this.ctx.query;
        const stream = await ctx.getFileStream();
        const {filename} = await ctx.service.image.uploadImage(stream, 'blog', ident);
        this.success(`blog/${ident}/${filename}`);
    }
}

module.exports = ImageController;
