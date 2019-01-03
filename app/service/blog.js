const {Service} = require('egg');

class BlogService extends Service {
    async findBlog() {
        return await this.ctx.model.Blog.find();
    }

    async saveBlog(blog = {}) {
        const blogModel = new this.ctx.model.Blog(blog);
        return await blogModel.save();
    }

    async updateBlog(blog) {
        const {nModified} = await this.ctx.model.Blog.updateOne({
            '_id': blog._id
        }, blog);
        return nModified > 0;
    }

    async deleteBlog(title) {
        const {n} = await this.ctx.model.Blog.deleteOne({
            'title': title
        });
        return n > 0;
    }

}

module.exports = BlogService;
