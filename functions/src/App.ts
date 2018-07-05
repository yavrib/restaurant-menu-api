import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import restaurantRouter from './routes/RestaurantRouter';
import menuRouter from './routes/MenuRouter';
import itemRouter from './routes/ItemRouter';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // This looks bad, send halp
    this.express.use('/restaurants', itemRouter);
    this.express.use('/restaurants', menuRouter);
    this.express.use('/restaurants', restaurantRouter);
  }
}

export default new App().express;
