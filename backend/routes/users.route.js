const express = require('express');
const app = express();
const usersRoute = express.Router();

// users model
let Users = require('../models/Users');

// Validate user
usersRoute.route('/validate').post((req, res, next) => {
  Users.find({
    $and: [ { user_id :  req.body['user_id'] },
    { password :  req.body['password'] }
    ]},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data && data.length > 0 ? data : "Invalid")
    }
  })
});

// Add users
usersRoute.route('/create').post((req, res, next) => {
  Users.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All users
usersRoute.route('/').get((req, res) => {
  Users.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single user
usersRoute.route('/read/:id').get((req, res) => {
  Users.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update user
usersRoute.route('/update/:id').put((req, res, next) => {
  Users.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete user
usersRoute.route('/delete/:id').delete((req, res, next) => {
  Users.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = usersRoute;