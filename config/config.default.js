'use strict';

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

    return config;
};
