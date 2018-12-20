'use strict';

const Controller = require('./base_controller');

class HomeController extends Controller {
    async index() {
        this.success('dsadsadas')
    }
}

module.exports = HomeController;
