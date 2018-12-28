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
        return await this.ctx.model.Blog.updateOne({
            '_id': blog.id
        }, blog);
    }

    async deleteBlog(title) {
        return await this.ctx.model.Blog.deleteOne({
            'title': title
        });
    }

}

module.exports = BlogService;
