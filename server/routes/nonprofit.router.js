const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get the nonprofit's information from the database
router.get('/:id', (req, res) => {
    let queryText = `SELECT "event"."name" AS "event_name",
         "event".id AS "event_id", "event".start_date, 
         "nonprofit"."name" AS "nonprofit_name", "event".start_time, 
         "nonprofit".address, "nonprofit".city, "nonprofit".state, 
         "nonprofit".zip_code, "nonprofit".contact_name, "nonprofit".contact_phone, 
         "nonprofit".category_id,
         "nonprofit".contact_email, "nonprofit".id AS "nonprofit_id", "nonprofit".description, "nonprofit".logo, "nonprofit".website FROM "nonprofit" FULL OUTER JOIN "event" on "event".non_profit_id = "nonprofit".id WHERE "nonprofit".id = $1;`;
    let id = req.params.id;
    pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

//grabs editable information from the specified nonprofit for editing. 
router.get('/edit/:id', rejectUnauthenticated, (req, res) => {

    let queryText = `SELECT "nonprofit".name, "nonprofit".id, "nonprofit".contact_email, "nonprofit".address,"nonprofit".description,
    "nonprofit".city, "nonprofit".zip_code, "nonprofit".website, "nonprofit".logo, "nonprofit".category_id FROM "nonprofit" WHERE "id";`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

//edits nonprofits information 
router.put('/editNonprofit', rejectUnauthenticated, (req, res) => {

    if (req.user.id === req.body.nonprofit_id) {
        let queryText = `UPDATE "nonprofit" SET "name" = $1, "contact_email" = $2, "address" = $3, "city" = $4, 
        "zip_code" = $5, "website" = $6, "logo" = $7, "description" = $8, "last_confirmed" = CURRENT_DATE, "category_id" = $9, "contact_name" = $10, "contact_phone" = $11, "state" = $12  WHERE "id" = $13;`;
        let name = req.body.nonprofit_name;
        let contact_email = req.body.contact_email;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let zip_code = req.body.zip_code;
        let website = req.body.website;
        let logo = req.body.logo;
        let description = req.body.description;
        let id = req.body.nonprofit_id;
        let category_id = req.body.category_id;
        let contact_phone = req.body.contact_phone;
        let contact_name = req.body.contact_name;

        pool.query(queryText, [name, contact_email, address, city, zip_code, website, logo, description, category_id, contact_name, contact_phone, state, id])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(500);
    }
});


// obtains all categories from the DB
router.get('/all/categories', (req, res) => {
    let queryText = `SELECT * FROM "categories"`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
           
            res.sendStatus(500);
        });
});


module.exports = router;