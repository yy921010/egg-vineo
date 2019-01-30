'use strict';
const { Controller } = require('egg');

class BaseController extends Controller {
  success(data = {} || []) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  fail(status = 500, msg = '') {
    this.ctx.throw(status, msg);
  }
}

module.exports = BaseController;
