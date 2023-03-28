const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: String,
    comicId: String,
    comment: String,
    rating: Number
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment
