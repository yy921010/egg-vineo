'use strict';
const os = require('os')
const path = require('path')


module.exports = appInfo => {
    const config = exports = {};
    exports.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0'
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1545141509031_3673';

    // add your config here
    config.middleware = [];

    config.security = {
        csrf: {
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            enable: false,
        }
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    config.upload = {
        path: 'app/public/upload'
    };


    return config;
};
