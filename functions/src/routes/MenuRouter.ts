import { Router, Request, Response, NextFunction } from 'express';

import MenuService from '../services/MenuService';
import RestaurantService from '../services/RestaurantService';

class MenuRouter {
  router: Router
  menuService: MenuService

  constructor(menuService: MenuService) {
    this.router = Router();
    this.menuService = menuService;
    this.init();
  }

  init() {
    this.router.get('/:restaurantId/menus', (req, res, next) => {
      const { error, data } = this.menuService.getAll(req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.get('/:restaurantId/menus/:id', (req, res, next) => {
      const { error, data } = this.menuService.getOne(req.params.id, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.post('/:restaurantId/menus', (req, res, next) => {
      const { error, data } = this.menuService.create(req.body, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.put('/:restaurantId/menus/:id', (req, res, next) => {
      const { error, data } = this.menuService.update(req.params.id, req.body, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.delete('/:restaurantId/menus/:id', (req, res, next) => {
      const { error, data } = this.menuService.remove(req.params.id, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });
  }
}

const menuRouter = new MenuRouter(new MenuService(new RestaurantService()));
menuRouter.init();

export default menuRouter.router;
