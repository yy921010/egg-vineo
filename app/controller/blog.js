const Controller = require('./base_controller');


const BlogRules = {
    title: {
        type: 'string',
        required: false
    },
    content: {
        type: 'string',
        allowEmpty: true
    },
    isHidden: {
        type: 'boolean',
        required: false
    },
    tags: {
        type: 'array',
        itemType: 'string'
    },
    abstract: {
        type: 'string',
        allowEmpty: true
    },
    thumbnail: {
        type: 'string',
        allowEmpty: true
    }
};

class BlogController extends Controller {
    /**
     * 得到博客数据
     * @returns {Promise<void>}
     */
    async index() {
        const {page = 1, size = 20, blogId} = this.ctx.query;
        if (blogId) {
            const blog = await this.ctx.service.blog.blogById(blogId);
            this.success(blog);
        } else {
            let blogs = await this.ctx.service.blog.findBlog(+page, +size);
            let count = await this.ctx.service.blog.blogCount();
            this.success({
                blogs,
                totalPages: Math.ceil(count / size),
                page,
                size,
                total: count
            })
        }

    }

    async save() {
        const blogData = this.ctx.request.body;
        try {
            this.ctx.validate(BlogRules, blogData);
        } catch (e) {
            this.ctx.logger.warn(e.message);
            this.fail(500, e.message)
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
        const isUpdateStatus = await this.ctx.service.blog.updateBlog(blogData);
        if (isUpdateStatus) {
            this.success('更新成功')
        } else {
            this.success('更新失败')
        }
    }

    async delete() {
        const {title} = this.ctx.query;
        if (title) {
            const isDelete = await this.ctx.service.blog.deleteBlog(title);
            this.success(isDelete ? '删除成功' : '删除失败');
        } else {
            this.fail(400, '请传入相应的参数')
        }
    }

}

module.exports = BlogController;
