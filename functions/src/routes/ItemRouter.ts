import { Router, Request, Response, NextFunction } from 'express';

import ItemService from '../services/ItemService';
import MenuService from '../services/MenuService';
import RestaurantService from '../services/RestaurantService';

class ItemRouter {
  router: Router
  itemService: ItemService

  constructor(itemService: ItemService) {
    this.router = Router();
    this.itemService = itemService;
    this.init();
  }

  init() {
    this.router.get('/:restaurantId/menus/:menuId/items', (req, res, next) => {
      const { error, data } = this.itemService.getAll(req.params.menuId, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.get('/:restaurantId/menus/:menuId/items/:id', (req, res, next) => {
      const { error, data } = this.itemService.getOne(req.params.id, req.params.menuId, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.post('/:restaurantId/menus/:menuId/items', (req, res, next) => {
      const { error, data } = this.itemService.create(req.body, req.params.menuId, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.put('/:restaurantId/menus/:menuId/items/:id', (req, res, next) => {
      const { error, data } = this.itemService.update(req.params.id, req.body, req.params.menuId, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });

    this.router.delete('/:restaurantId/menus/:menuId/items/:id', (req, res, next) => {
      const { error, data } = this.itemService.remove(req.params.id, req.params.menuId, req.params.restaurantId);

      res.json({
        error,
        data
      });
    });
  }
}

const menuRouter = new ItemRouter(
  new ItemService(
    new MenuService(
      new RestaurantService()
    )
  )
);
menuRouter.init();

export default menuRouter.router;
