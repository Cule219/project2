const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  // name: {familyName: String, firstName: String},
  googleId: String,
  facebookId: String,
  githubId: String,
  password: String,
  description: String,
  profileImg: {
    type: String,
    default: 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg'
  }, //look into file upload
  reputation: Number,
  role: {
    type: String,
    enum: ['user', 'mod', 'admin']
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('User', userSchema);
