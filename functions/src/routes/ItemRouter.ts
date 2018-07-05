import { Router, Request, Response, NextFunction } from 'express';

import findAll from '../utils/findAll';
import find from '../utils/find';

const Items = [
  {
    restaurantId: 1,
    menuId: 2,
    id: 1,
    name: 'chicken wings',
  },
  {
    restaurantId: 1,
    menuId: 2,
    id: 2,
    name: 'chicken breast'
  },
  {
    restaurantId: 1,
    menuId: 1,
    id: 1,
    name: 'chicken with chick-a chick-a'
  },
  {
    restaurantId: 2,
    menuId: 1,
    id: 1,
    name: 'the speaking goat (ram-say pun)'
  },
  {
    restaurantId: 2,
    menuId: 1,
    id: 2,
    name: 'tears of his enemies'
  }
];

class ItemRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/:restaurantId/menus/:menuId/items', (req, res, next) => {
      const itemsOfRestaurant = findAll(Items, req.params.restaurantId, 'restaurantId');
      const itemsOfMenu = findAll(itemsOfRestaurant, req.params.menuId, 'menuId');
      res.json([...itemsOfMenu]);
    });

    this.router.get('/:restaurantId/menus/:menuId/items/:id', (req, res, next) => {
      const itemsOfRestaurant = findAll(Items, req.params.restaurantId, 'restaurantId');
      const itemsOfMenu = findAll(itemsOfRestaurant, req.params.menuId, 'menuId');
      const item = find(itemsOfMenu, req.params.id, 'id');

      res.json({
        ...item
      });
    });
  }
}

const menuRouter = new ItemRouter();
menuRouter.init();

export default menuRouter.router;
