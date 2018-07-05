import { Router, Request, Response, NextFunction } from 'express';

import find from '../utils/find';

const Restaurants = [
  {
    id: 1,
    name: 'Los Pollos Hermanos'
  },
  {
    id: 2,
    name: 'Hell\'s Kitchen'
  }
]

class RestaurantRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', (req, res, next) => {
      res.json([...Restaurants])
    });

    this.router.get('/:id', (req, res, next) => {
      const restaurant = find(Restaurants, req.params.id, 'id')
      res.json({
        ...restaurant
      })
    });
  }
}

const restaurantRouter = new RestaurantRouter();
restaurantRouter.init();

export default restaurantRouter.router;
