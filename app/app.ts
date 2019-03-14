import * as bodyParser from "body-parser";
import express from "express";
import methodOverride from "method-override";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import { Routes } from '../app/routes/petRoute';

const uri: string = "mongodb://127.0.0.1:27017/petstore";

export class App {

  public app: express.Application = express();
  public routes: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.mongooseSetUp();
    this.routes.routes(this.app);
  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(methodOverride());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // this.app.use('/pets', routes);
  }
  private mongooseSetUp(): void {
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(uri, { useNewUrlParser: true});
    console.log('Successfully connected');
  }
}
export default new App().app;