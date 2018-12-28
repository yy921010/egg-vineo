'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.get('/blog', controller.blog.index);
    router.post('/blog', controller.blog.save);
    router.put('/blog', controller.blog.update);
    router.delete('/blog', controller.blog.delete)
};
