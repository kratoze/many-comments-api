const { mongoose } = require('../db/mongoose.js');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  parent: { type: Schema.Types.ObjectId, refPath: 'connections.kind' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  positive: { type: Boolean, required: true },
});

likeSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

likeSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'parent',
});

likeSchema.set('toObject', { virtuals: true });
likeSchema.set('toJSON', { virtuals: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like };
