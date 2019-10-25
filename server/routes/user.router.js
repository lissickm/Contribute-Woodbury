const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  let contact_email = req.body.contact_email;
  let contact_name = req.body.contact_name;
  let contact_phone = req.body.contact_phone;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let zip_code = req.body.zip_code;
  let website = req.body.website;
  let logo = req.body.logo;
  let category_id = req.body.category_id;
  let description = req.body.description;

  const queryText = `INSERT INTO "nonprofit" (name, password, contact_email, contact_name, contact_phone, address, city, state, zip_code, website, logo, category_id, last_confirmed, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_DATE, $13) RETURNING id`;
  pool.query(queryText, [username, password, contact_email, contact_name, contact_phone, address, city, state, zip_code, website, logo, category_id, description])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
