'use strict';
const { Service } = require('egg');

class BlogService extends Service {

  async findBlog(pageNumber = 1, pageSize = 20) {
    return await this.ctx.model.Blog
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({
        _id: -1,
      });
  }

  async blogCount() {
    return await this.ctx.model.Blog
      .find()
      .countDocuments();
  }

  async blogById(id) {
    this.ctx.logger.debug('id', id);
    const blog = await this.ctx.model.Blog.findById(id);
    this.ctx.logger.debug('blog', blog);
    return blog;
  }

  async saveBlog(blog = {}) {
    const blogModel = new this.ctx.model.Blog(blog);
    return await blogModel.save();
  }

  async updateBlog(id, blog) {
    const { nModified } = await this.ctx.model.Blog.updateOne({
      _id: id,
    }, blog);
    return nModified > 0;
  }

  async deleteBlog(id) {
    const { n } = await this.ctx.model.Blog.deleteOne({
      _id: id,
    });
    return n > 0;
  }

}

module.exports = BlogService;
