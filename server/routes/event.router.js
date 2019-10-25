const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// grabs details for specific event
router.get('/calendar', (req, res) => {
  let queryText = 'SELECT * FROM "event"  WHERE "end_date" > CURRENT_DATE - 30;';
  pool.query(queryText)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    })
});

//get the past events for a specific nonprofit
router.get('/nonprofit/:id', rejectUnauthenticated, (req,res) => {

  
  let queryText = `SELECT * FROM "event" WHERE "non_profit_id" = $1 AND "end_date" < CURRENT_DATE;`;
  let id = req.params.id
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      res.sendStatus(500)
    })
});

// grabs details of a specific event
router.get('/:id', (req, res) => {
  let queryText = 'SELECT * FROM "event" WHERE "id" = $1 ORDER BY "start_date";';
  pool.query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

//adds new event for specific nonprofit
router.post('/addEvent', rejectUnauthenticated, (req, res) => {
  if (req.user.id === +(req.body.non_profit_id)) {
  let queryText = `INSERT INTO "event" ("name", "non_profit_id", "description", "address", "city", "zip_code",
    "start_date", "end_date", "start_time", "end_time", "event_url", "state") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`;
  let name =  req.body.name;
  let non_profit_id = req.body.non_profit_id;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let state = req.body.state;
  let event_url = req.body.event_url;


    pool.query(queryText, [name, non_profit_id, description, address, city, zip_code, start_date, end_date, start_time , end_time, event_url, state])
    .then((result) => {
      res.send(result.rows)
    })
    .catch ((error) => {
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

//updates past event details for "add new event" 
router.post('/addPastEvent', rejectUnauthenticated, (req, res) => {
  let queryText = `INSERT INTO "event" ("name", "description", "address", "city", "zip_code", "start_date", "end_date", "event_url", "non_profit_id", "start_time", "end_time", "state") 
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $, $10, $11, $12) RETURNING *;`;

  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let event_url = req.body.event_url;
  let non_profit_id = req.body.non_profit_id;

  pool.query(queryText, [name, description, address, city, zip_code, state, start_date, end_date, event_url, non_profit_id, start_time, end_time, state])
  .then((result) => {
    res.send(result.rows)
  })
  .catch((error) => {
    res.sendStatus(500)
  })
})

//edits event details
router.put('/editEvent', rejectUnauthenticated, (req,res) => {
  if (req.user.id === req.body.non_profit_id) {
let queryText = `UPDATE "event" SET "name" = $1, "description" = $2, "address" = $3, "city" = $4, "zip_code" = $5, "start_date" = $6, 
  "end_date" = $7, "event_url" = $8, "state" = $9, "start_time" = $10, "end_time" = $11, "non_profit_id" = $12 WHERE "id" = $13;`;
  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let city = req.body.city;
  let zip_code = req.body.zip_code;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let event_url = req.body.event_url;
  let state = req.body.states;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let non_profit_id = req.body.non_profit_id;
  let id = req.body.id;

  pool.query(queryText, [name, description, address, city, zip_code, start_date, end_date, event_url, state, start_time, end_time, non_profit_id, id])
      .then((result) => {
        res.sendStatus(200)
      })
      .catch((error) => {
        res.sendStatus(500)
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/:id/:np_id', rejectUnauthenticated, (req, res) => {
  if(req.user.id === +(req.params.np_id)){
    let queryText = `DELETE FROM "event" WHERE "id" = $1`
    pool.query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
    })
  }
})

module.exports = router;