const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

//Cloudinary and file uploads
const fileupload = require('express-fileupload')
const cors = require('cors');

//automation library
// const cron = require('node-cron');

// Route includes
const userRouter = require('./routes/user.router');
const nonprofitRouter = require('./routes/nonprofit.router');
const directoryRouter = require('./routes/directory.router');
const eventRouter = require('./routes/event.router');
const volunteerRouter = require('./routes/volunteer.router');
const adminRouter = require('./routes/admin.router');
const imageUpload = require('./routes/imageUpload.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// File upload and CORS middleware
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

//This doesen't work currently but can in the future with a little bit of work 
// automated deletion of old nonProfits
// cron.schedule("*/10 * * * * *", async () => {
//   console.log(Date());
//   function* autoDelete() {
//   try {
//     let response = yield axios.get(`/api/admin/requests`);
//     return('this happens every 10 seconds', response.data);
//   } catch (error) {
//     return('error in autoDelete', error)
//   }
// }
// console.log(autoDelete());
// });

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/nonprofit', nonprofitRouter);
app.use('/api/directory', directoryRouter);
app.use('/api/event', eventRouter);
app.use('/api/volunteer', volunteerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', imageUpload);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
