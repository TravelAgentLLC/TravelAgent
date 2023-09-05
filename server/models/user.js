const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  vacations: [
    {
      _id: false,
      flights: {
        0: String,
        1: String,
        2: String,
      },
      hotels: {
        0: {
          name: String,
          rating: Number,
          photos: String,
        },
        1: {
          name: String,
          rating: Number,
          photos: String,
        },
        2: {
          name: String,
          rating: Number,
          photos: String,
        },
      },
      thingsToDo: {
        0: {
          name: String,
          rating: Number,
          photo: String,
        },
        1: {
          name: String,
          rating: Number,
          photo: String,
        },
        2: {
          name: String,
          rating: Number,
          photo: String,
        },
      },
      location: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
