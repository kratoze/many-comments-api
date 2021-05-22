const { mongoose } = require('../db/mongoose.js');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

postSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'parent',
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema.pre('find', function () {
  this.populate('author', 'username').populate('comments');
});

// postSchema.pre('save', function () {
//   this.populate('author', 'username').populate('comments');
// });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
