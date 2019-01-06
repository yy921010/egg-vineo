const {Service} = require('egg');

class BlogService extends Service {

    async findBlog(pageNumber = 1, pageSize = 20) {
        return await this.ctx.model.Blog
            .find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .sort({
                _id: -1
            })
    }

    async blogCount() {
        return await this.ctx.model.Blog
            .find()
            .countDocuments();
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
