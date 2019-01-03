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
        }
    });

    return mongoose.model('Blog', BlogSchema);
};
