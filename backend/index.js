require('dotenv/config')

const express = require('express');
const app = express();
const User = require('./models/user');
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
app.use(express.json());

app.get('/api/users', (request, response) => {
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

// Login Endpoint
app.get('/login', (req,res) => {
  client.v2
   if (req.query.phonenumber) {
      client
      .verify.v2
      .services(process.env.SERVICE_ID)
      .verifications
      .create({
          to: `+${req.query.phonenumber}`,
          channel: req.query.channel==='call' ? 'call' : 'sms' 
      })
      .then(data => {
          res.status(200).send({
              message: "Verification is sent!!",
              phonenumber: req.query.phonenumber,
              data
          })
      }) 
   } else {
      res.status(400).send({
          message: "Wrong phone number :(",
          phonenumber: req.query.phonenumber,
          data
      })
   }
})

// Verify Endpoint
app.get('/verify', (req, res) => {
  if (req.query.phonenumber) {
      client
          .verify.v2
          .services(process.env.SERVICE_ID)
          .verificationChecks
          .create({
              to: `+${req.query.phonenumber}`,
              code: req.query.code
          })
          .then(data => {
              if (data.status === "approved") {
                  res.status(200).send({
                      message: "User is Verified!!",
                      data
                  })
              }
          })
  } else {
      res.status(400).send({
          message: "Wrong phone number or code :(",
          phonenumber: req.query.phonenumber,
      })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
