//Post details model:
// add geo-location

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  boardType: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  description: { type: String },
  tail: { type: String },
  finSystem: { type: String },
  finConfiguration: { type: String },
  LengthFt: { type: String },
  LengthIn: { type: String },
  width: { type: String },
  depth: { type: String },
  volume: { type: String },
  construction: { type: String },
  glassing: { type: String },
  contour: { type: String },
  waveSize: { type: String },
  drive: { type: String },
  paddlePower: { type: String },
  movability: { type: String },
  shaper: { type: String },
  model: { type: String },
  location: {
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String }
  },
  images: [
    {
      imgKey: String,
      thumbnail: String,
      default: String
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ]
});

module.exports = Post = mongoose.model('post', PostSchema);
