module.exports = app => {
    const {mongoose, mongoose: {Schema}} = app;

    const UserSchema = new Schema({
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nickName: {
            type: String,
            required: true
        }
    });
    return mongoose.model('User', UserSchema);
};
