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
        allowEmpty: true,
        default: ''
    }
};

class BlogController extends Controller {
    /**
     * 得到博客数据
     * @returns {Promise<void>}
     */
    async index() {
        const {page = 1, size = 20} = this.ctx.query;
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

    /**
     * 根据Id 查询博客
     * @returns {Promise<void>}
     */
    async show() {
        const {id} = this.ctx.params;
        const blog = await this.ctx.service.blog.blogById(id);
        this.success(blog);
    }

    /**
     * 保存博客
     */
    async create() {
        const blogData = this.ctx.request.body;
        try {
            this.ctx.validate(BlogRules, blogData);
        } catch (e) {
            this.ctx.logger.warn(e.message);
            this.fail(500, e.message)
        }
        this.success(await this.ctx.service.blog.saveBlog(blogData));
    }

    /**
     * 更新博客
     * @returns {Promise<void>}
     */
    async update() {
        const blogData = this.ctx.request.body;
        const {id} = this.ctx.params;
        try {
            this.ctx.validate(BlogRules, blogData);
        } catch (e) {
            this.ctx.logger.warn(e.errors);
            this.fail(400, e.errors)
        }
        const isUpdateStatus = await this.ctx.service.blog.updateBlog(id, blogData);
        if (isUpdateStatus) {
            this.success('更新成功')
        } else {
            this.success('更新失败')
        }
    }

    async destroy() {
        const {id} = this.ctx.params;
        if (id) {
            const isDelete = await this.ctx.service.blog.deleteBlog(id);
            this.success(isDelete ? '删除成功' : '删除失败');
        } else {
            this.fail(400, '请传入相应的参数')
        }
    }

}

module.exports = BlogController;
