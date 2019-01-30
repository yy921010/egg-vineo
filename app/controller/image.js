'use strict';
const Controller = require('./base_controller');
const path = require('path');

class ImageController extends Controller {

  async index() {
    this.success({});
  }

  /**
     * 上传图片
     */
  async create() {
    const stream = await this.ctx.getFileStream();
    const { fields: { moduleName, id } } = stream;
    const { filename, mimeType } = await this.ctx.service.image.uploadImage(stream, moduleName, id);
    this.success({
      type: mimeType,
      name: filename,
      moduleName,
      id,
    });
  }

  async destroy() {
    const { id } = this.ctx.params;
    const { moduleName, pathName } = this.ctx.request.body;
    const delPath = path.join(this.config.baseDir, this.config.upload.path, moduleName, pathName);
    this.ctx.helper.deleteFileByName(id, delPath);
    this.success('成功');
  }
}

module.exports = ImageController;
