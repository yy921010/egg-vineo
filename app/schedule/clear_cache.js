const {Subscription} = require('egg');
const path = require('path');

class ClearCache extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '60m', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const delPath = path.join(this.config.baseDir, this.config.upload.temp);
        this.ctx.helper.deleteDir(delPath);
    }
}

module.exports = ClearCache;
