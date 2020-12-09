const bodyparser = require('body-parser');
const usersRouter = require("./routes/user");
const indexRouter = require("./routes/index");
const transRouter = require("./routes/transaction");
const express = require('express');
const app = express();
const cors = require('cors');

require('./database');
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
/**Routes required for the connection to the front**/
app.use("/user", usersRouter);
app.use("/index", indexRouter);
app.use("/transaction", transRouter);
app.listen(3001);
 
module.exports = app;

