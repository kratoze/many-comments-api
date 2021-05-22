const { mongoose } = require('../db/mongoose.js');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    refPath: 'connections.kind',
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, required: true },
  date: { type: Date, default: Date.now, required: true },
});

commentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

commentSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'parent',
});

commentSchema.pre('find', function () {
  this.populate('author', 'username').populate('comments').populate('likes');
});

commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
