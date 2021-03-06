const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('./user.controller');
const config = require('../config/config');


const router = express.Router(); // eslint-disable-line new-cap

// Must be authenticated
const checkAuthentication = (req, res, next) => {
  if (!req.cookies.nToken) {
    res.redirect('/');
  } else {
    const { nToken } = req.cookies;
    const decodedToken = jwt.verify(nToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.redirect('/');
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

router.get('/profile', checkAuthentication, userController.getUser);

// router.get('/:username', userController.getOneUser);

// router.patch('/:username', checkAuthentication, userController.updateUser);

// router.post('/:username/delete', checkAuthentication, userController.deleteUser);

module.exports = router;
