const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const users = await ctx.model.User.find({});
        this.logger.info(users)
    }
}

module.exports = NewsController;
