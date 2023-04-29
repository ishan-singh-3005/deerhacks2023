const express = require('express');
const app = express();
const User = require('./models/user');

app.get('api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users);
  })
})

app.post('/api/users', (request, response) => {
  const newUser = request.body;

  if (newUser.userName === undefined) {
    return response.status(400).json({ error: 'name missing' });
  } else if (newUser.password === undefined) {
    return response.status(400).json({ error: 'password missing' });
  } else if (newUser.car === undefined) {
    return response.status(400).json({ error: 'car status missing' });
  } else if (newUser.lat === undefined) {
    return response.status(400).json({ error: 'latitude missing' });
  } else if (newUser.long === undefined) {
    return response.status(400).json({ error: 'longitude missing' });
  } else if (newUser.phoneNumber === undefined) {
    return response.status(400).json({ error: 'phone number missing' });
  }

  const user = new User({
    userName: newUser.userName,
    passowrd: newUser.password,
    car: newUser.car,
    lat: newUser.lat,
    long: newUser.long,
    phoneNumber: newUser.phoneNumber
  })

  user.save().then(savedUser => {
    response.json(savedUser);
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
