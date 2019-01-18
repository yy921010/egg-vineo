'use strict';
const apiVersion = 'v1';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    /**
     * restful api blog
     */
    router.resources('blogs', `/${apiVersion}/blogs`, controller.blog);
    router.resources('images', `/${apiVersion}/images`, controller.image);
};
