const Controller = require('./base_controller');


const BlogRules = {
    title: {
        type: 'string',
        required: false
    },
    content: {
        type: 'string',
        required: false
    },
    type: {
        type: 'array',
        itemType: 'string'
    },
    date: {
        type: 'string',
        required: false
    },
    isDraft: {
        type: 'boolean',
        required: false
    }
};

class BlogController extends Controller {
    /**
     * 得到博客数据
     * @returns {Promise<void>}
     */
    async index() {
        this.success(await this.ctx.service.blog.findBlog())
    }

    async save() {
        const blogData = this.ctx.request.body;
        try {
            this.ctx.validate(BlogRules, blogData);
        } catch (e) {
            this.ctx.logger.warn(e.errors);
            this.fail(500, e.errors)
        }
        this.success(await this.ctx.service.blog.saveBlog(blogData));
    }

    async update() {
        const blogData = this.ctx.request.body;
        try {
            this.ctx.validate(BlogRules, blogData);
        } catch (e) {
            this.ctx.logger.warn(e.errors);
            this.fail(400, e.errors)
        }
        this.success(await this.ctx.service.blog.updateBlog(blogData));
    }

    async delete() {
        const {title} = this.ctx.query;
        if (title) {
            this.success(await this.ctx.service.blog.deleteBlog(title));
        } else {
            this.fail(400, '请传入相应的参数')
        }
    }

}

module.exports = BlogController;
