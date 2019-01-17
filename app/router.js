'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    const apiVersion = 'v1';
    router.get('/', controller.home.index);
    router.post('/imgUpload', controller.image.index);
    /**
     * restful api blog
     */
    router.resources('blogs', `/${apiVersion}/blogs`, controller.blog)
};
