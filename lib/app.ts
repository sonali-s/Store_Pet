import * as bodyParser from "body-parser";
import * as express from "express";
import * as methodOverride from "method-override";
import * as mongoose from "mongoose";

import petRouter from '../lib/routes/petRoute';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

const uri: string = "mongodb://127.0.0.1:27017/petstore";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

app.use('/', petRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.send(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error);
});
export default app;