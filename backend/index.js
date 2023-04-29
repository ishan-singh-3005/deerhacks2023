const express = require('express');
const app = express();
const User = require('./models/user');

app.get('api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users);
  })
})

app.post('/api/entries', (request, response) => {
  const entry = request.body;

  if (entry.userName === undefined) {
    return response.status(400).json({ error: 'name missing' });
  } else if (entry.password === undefined) {
    return response.status(400).json({ error: 'password missing' });
  } else if (entry.car === undefined) {
    return response.status(400).json({ error: 'car status missing' });
  } else if (entry.lat === undefined) {
    return response.status(400).json({ error: 'latitude missing' });
  } else if (entry.long === undefined) {
    return response.status(400).json({ error: 'longitude missing' });
  } else if (entry.phoneNumber === undefined) {
    return response.status(400).json({ error: 'phone number missing' });
  }

  const user = new User({
    userName: entry.userName,
    passowrd: entry.password,
    car: entry.car,
    lat: entry.lat,
    long: entry.long,
    phoneNumber: entry.phoneNumber
  })

  user.save().then(savedEntry => {
    response.json(savedEntry);
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
