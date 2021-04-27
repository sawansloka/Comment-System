const express = require('express');
const { dbConnect } = require('./DB/Connection');
const UsEr = require('./Route/Route');
const app = express();
app.use(express.json());
app.use(UsEr);
const PORT = 3009;
app.listen(PORT, () => {
  dbConnect();
  console.log('Listening at Port ' + PORT);
});
