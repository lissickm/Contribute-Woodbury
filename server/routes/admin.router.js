const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');

//updates nonprofit's approval to true
router.put('/approve/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
        let queryText = `UPDATE "nonprofit" SET "is_approved" = 'true' WHERE "id" = $1;`;
        let id = req.params.id
        pool.query(queryText, [id])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            });
})

//deletes Nonprofits and all their related data (events, roles, etc)
router.delete('/decline/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    let queryText = `DELETE FROM "nonprofit" WHERE "id" = $1;`;
    
        pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

//gets the nonprofit requests from the database
router.get('/requests', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
        let queryText = `SELECT * FROM "nonprofit" WHERE "is_approved" = 'false';`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows)
            })
            .catch((error) => {
                res.sendStatus(500);
            });
});

// selects all nonprofits from the database and sorts the by those whose last confirm date is over a year old.
router.get('/directory', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    let queryText = `SELECT "categories".name AS "category_name", "nonprofit".name, "nonprofit".address, "nonprofit".city, "nonprofit".id, 
        "nonprofit".logo, "nonprofit".last_confirmed, "nonprofit".zip_code, "nonprofit".state FROM "categories" FULL OUTER JOIN "nonprofit" ON 
        "nonprofit".category_id="categories".id WHERE NOT "nonprofit".name='Admin' ORDER BY "last_confirmed";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                res.sendStatus(500);
            });
})


module.exports = router;