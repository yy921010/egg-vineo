'use strict';
module.exports = appInfo => {
  const config = exports = {};
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/vineo',
      options: {
        user: 'charles',
        pass: '123456',
        poolSize: 5,
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 120,
        useNewUrlParser: true,
      },
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545141509031_3673';

  // add your config here
  config.middleware = [];

  return config;
};
