import { Router, Request, Response, NextFunction } from 'express';

import findAll from '../utils/findAll';
import find from '../utils/find';

const Menus = [
  {
    restaurantId: 1,
    id: 2,
    name: 'Chickennado'
  },
  {
    restaurantId: 1,
    id: 1,
    name: 'Chick-a chick-a'
  },
  {
    restaurantId: 2,
    id: 1,
    name: 'The Ramsay'
  }
]

class MenuRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/:restaurantId/menus', (req, res, next) => {
      const menusOfRestaurant = findAll(Menus, req.params.restaurantId, 'restaurantId');
      res.json([...menusOfRestaurant]);
    });

    this.router.get('/:restaurantId/menus/:id', (req, res, next) => {
      const menusOfRestaurant = findAll(Menus, req.params.restaurantId, 'restaurantId');
      const menu = find(menusOfRestaurant, req.params.id, 'id');

      res.json({
        ...menu
      });
    });
  }
}

const menuRouter = new MenuRouter();
menuRouter.init();

export default menuRouter.router;
