import Menu from '../models/Menu';
import BaseService from './BaseService';
import RestaurantService from './RestaurantService';

import findAll from '../utils/findAll';
import find from '../utils/find';
import isEmpty from '../utils/isEmpty';
import Result from '../utils/result';
import replace from '../utils/replace';
import findRest from '../utils/findRest';

let Menus: Array<Menu> = [
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

// I hope firestore simplifies this, by a lot. Or else I am doomed.
// I mean look at those ifs, man. Those ifs are scary.
// insert one of those ifs here below
// https://i.imgflip.com/2dkm46.jpg

class MenuService implements BaseService<Menu> {
  restaurantService: RestaurantService

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  getAll(restaurantId?: string): Result<Menu[], string> {
    const { error: restaurantError, data: restaurantData } = this.restaurantService.getOne(restaurantId);

    if (restaurantError) return new Result (null, restaurantError);

    if (isEmpty(restaurantData)) return new Result(null, 'Restaurant does not exist');

    const menus = findAll(Menus, restaurantId, 'restaurantId');

    return new Result(menus, null);
  }

  getOne(id: string, restaurantId?: string): Result<Menu, string> {
    const { error: restaurantError, data: restaurantData } = this.restaurantService.getOne(restaurantId);

    if (restaurantError) return new Result (null, restaurantError);

    if (isEmpty(restaurantData)) return new Result(null, 'Restaurant does not exist');

    const menusOfRestaurant = findAll(Menus, restaurantId, 'restaurantId');
    const menu = find(menusOfRestaurant, id, 'id');

    return new Result(menu, null);
  }

  create(menu: Menu, restaurantId?: string): Result<Menu, string> {
    const { error: restaurantError, data: restaurantData } = this.restaurantService.getOne(restaurantId);

    if (restaurantError) return new Result (null, restaurantError);

    if (isEmpty(restaurantData)) return new Result(null, 'Restaurant does not exist');

    if (restaurantData.id !== menu.restaurantId) return new Result(null, 'Restaurant id and payload restaurant id mismatch');

    Menus = [ ...Menus, menu ];
    return new Result(menu, null);
  }

  update(id: string, newMenu: Menu, restaurantId?: string): Result<Menu, string> {
    const { error: restaurantError, data: restaurantData } = this.restaurantService.getOne(restaurantId);

    if (restaurantError) return new Result (null, restaurantError);

    if (isEmpty(restaurantData)) return new Result(null, 'Restaurant does not exist');

    // This is basically an authorization problem which should not be my concern
    // because this project will never actually support and authorization layer.
    if (restaurantData.id !== newMenu.restaurantId) return new Result(null, 'Restaurant id and payload restaurant id mismatch');

    // This is also getting out of hand. Send Halp
    const menusOfRestaurant = findAll(Menus, restaurantId, 'restaurantId');
    const newMenusOfRestaurant = replace(menusOfRestaurant, id, 'id', newMenu)
    const restOfMenus = findRest(Menus, restaurantId, 'restaurantId');

    Menus = [ ...restOfMenus, ...newMenusOfRestaurant ];

    return new Result(newMenu, null);
  }

  remove(id: string, restaurantId?: string): Result<Menu, string> {
    const { error: restaurantError, data: restaurantData } = this.restaurantService.getOne(restaurantId);

    if (restaurantError) return new Result (null, restaurantError);

    if (isEmpty(restaurantData)) return new Result(null, 'Restaurant does not exist');

    let result = new Result(null, 'Menu does not exits');
    const menusOfRestaurant = findAll(Menus, restaurantId, 'restaurantId');
    const restOfMenus = findRest(Menus, restaurantId, 'restaurantId');

    Menus = [
      ...restOfMenus,
      ...menusOfRestaurant.filter(menu => {
        if ((menu.id.toString() === id)) {
          result = new Result(menu, null)
          return false;
        }

        return true;
      })
    ];

    return result;
  }
}

export default MenuService;
