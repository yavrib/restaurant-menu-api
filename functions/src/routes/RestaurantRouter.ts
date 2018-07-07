import { Router, Request, Response, NextFunction } from 'express';

import RestaurantService from '../services/RestaurantService';

class RestaurantRouter {
  router: Router
  restaurantService: RestaurantService

  constructor(restaurantService: RestaurantService) {
    this.router = Router();
    this.restaurantService = restaurantService;
    this.init();
  }

  init() {
    this.router.get('/', (req, res, next) => {
      const { error, data } = this.restaurantService.getAll();

      res.json({
        error,
        data
      });
    });

    this.router.post('/', (req, res, next) => {
      const { error, data } = this.restaurantService.create(req.body);

      res.json({
        error,
        data
      });
    });

    this.router.put('/:id', (req, res, next) => {
      const { error, data } = this.restaurantService.update(req.params.id, req.body);

      res.json({
        error,
        data
      });
    });

    this.router.delete('/:id', (req, res, next) => {
      const { error, data } = this.restaurantService.remove(req.params.id);

      res.json({
        error,
        data
      });
    });

    this.router.get('/:id', (req, res, next) => {
      const { error, data } = this.restaurantService.getOne(req.params.id);

      res.json({
        error,
        data
      });
    });
  }
}

const restaurantRouter = new RestaurantRouter(new RestaurantService());
restaurantRouter.init();

export default restaurantRouter.router;
