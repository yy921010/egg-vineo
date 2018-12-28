'use strict';

const Controller = require('./base_controller');

class HomeController extends Controller {
    async index() {
        const rules = {
            name: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        };
        try {
            this.ctx.validate(rules, this.ctx.query);
        } catch (err) {
            this.ctx.logger.warn(err.errors);
            this.ctx.set('show-response-time', '1234512312');
            this.ctx.body = {success: false};
        }
    }
}

module.exports = HomeController;
