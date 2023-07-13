const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      username: {
            type: String,
            required: [true, 'Please provide the username'],
      },
      email: {
            type: String,
            required: [true, 'Please provide the email'],
            unique: [true, 'Email address is already taken!'],
      },
      password: {
            type: String,
            required: [true, 'Password is required']
      }
},
      {
            timestamps: true
      })

module.exports = mongoose.model('Users', userSchema)