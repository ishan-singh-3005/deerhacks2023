const mongoose = require('mongoose');

const url = process.env.URI;

console.log('connecting to', url);
mongoose.connect(url)
  .then(console.log('connected'))
  .catch(err => {
    console.log('error connecting:', err.message);
  })

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  car: Boolean,
  lat: Number,
  long: Number, 
  phoneNumber: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('User', userSchema);
