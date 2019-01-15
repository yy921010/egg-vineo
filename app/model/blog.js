module.exports = app => {
    const {mongoose, mongoose: {Schema}} = app;

    const BlogSchema = new Schema({
            title: {
                type: String,
                required: true
            },
            content: {
                type: String
            },
            isHidden: {
                type: Boolean,
                required: true,
            },
            tags: {
                type: Array
            },
            abstract: {
                type: String
            },
            createTime: {
                type: Date,
                default: Date.now
            },
            updateTime: {
                type: Date,
                default: Date.now
            },
            thumbnail: {
                type: String
            },
            identification: {
                type: String
            }
        },
        {
            versionKey: false,
            timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
        });

    return mongoose.model('Blog', BlogSchema);
};
