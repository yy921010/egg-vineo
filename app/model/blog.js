module.exports = app => {
    const {mongoose, mongoose: {Schema}} = app;

    const BlogSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        isDraft: {
            type: Boolean,
            required: true
        },
        type: {
            type: Array
        }
    });
    return mongoose.model('Blog', BlogSchema);
};
