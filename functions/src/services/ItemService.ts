import Item from '../models/Item';
import BaseService from './BaseService';
import MenuService from './MenuService';

import findAll from '../utils/findAll';
import find from '../utils/find';
import isEmpty from '../utils/isEmpty';
import Result from '../utils/result';
import replace from '../utils/replace';
import findRest from '../utils/findRest';

let Items = [
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

class ItemService implements BaseService<Item> {
  menuService: MenuService

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  getAll(menuId?: string, restaurantId?: string): Result<Item[], string> {
    const { error: menuError, data: menuData } = this.menuService.getOne(menuId, restaurantId);

    if (menuError) return new Result (null, menuError);

    if (isEmpty(menuData)) return new Result(null, 'Menu does not exist');

    const itemsOfRestaurant = findAll(Items, restaurantId, 'restaurantId');
    const itemsOfMenu = findAll(itemsOfRestaurant, menuId, 'menuId');

    return new Result(itemsOfMenu, null);
  }

  getOne(id: string, menuId?:string, restaurantId?: string): Result<Item, string> {
    const { error: menuError, data: menuData } = this.menuService.getOne(menuId, restaurantId);

    if (menuError) return new Result (null, menuError);

    if (isEmpty(menuData)) return new Result(null, 'Menu does not exist');

    const itemsOfRestaurant = findAll(Items, restaurantId, 'restaurantId');
    const itemsOfMenu = findAll(itemsOfRestaurant, menuId, 'menuId');
    const item = find(itemsOfMenu, id, 'id');

    return new Result(item, null);
  }

  create(item: Item, menuId?: string, restaurantId?: string): Result<Item, string> {
    const { error: menuError, data: menuData } = this.menuService.getOne(menuId, restaurantId);

    if (menuError) return new Result (null, menuError);

    if (isEmpty(menuData)) return new Result(null, 'Menu does not exist');

    if (menuData.restaurantId !== item.restaurantId) return new Result(null, 'Restaurant id and payload restaurant id mismatch');
    if (menuData.id !== item.menuId) return new Result(null, 'Menu id and payload menu id mismatch');

    Items = [ ...Items, item ];
    return new Result(item, null);
  }

  update(id: string, newItem: Item, menuId?: string, restaurantId?: string): Result<Item, string> {
    const { error: menuError, data: menuData } = this.menuService.getOne(menuId, restaurantId);

    if (menuError) return new Result (null, menuError);

    if (isEmpty(menuData)) return new Result(null, 'Menu does not exist');

    if (menuData.restaurantId !== newItem.restaurantId) return new Result(null, 'Restaurant id and payload restaurant id mismatch');
    if (menuData.id !== newItem.menuId) return new Result(null, 'Menu id and payload menu id mismatch');

    const itemsOfRestaurant = findAll(Items, restaurantId, 'restaurantId');
    const itemsOfMenu = findAll(itemsOfRestaurant, menuId, 'menuId');
    const restOfItems = [
      ...findRest(Items, restaurantId, 'restaurantId'),
      ...findRest(itemsOfRestaurant, menuId, 'menuId')
    ];

    const newItemsOfMenu = replace(itemsOfMenu, id, 'id', newItem)

    Items = [ ...restOfItems, ...newItemsOfMenu ];

    return new Result(newItem, null);
  }

  remove(id: string, menuId?: string, restaurantId?: string): Result<Item, string> {
    const { error: menuError, data: menuData } = this.menuService.getOne(menuId, restaurantId);

    if (menuError) return new Result (null, menuError);

    if (isEmpty(menuData)) return new Result(null, 'Menu does not exist');

    let result = new Result(null, 'Menu does not exits');
    const itemsOfRestaurant = findAll(Items, restaurantId, 'restaurantId');
    const itemsOfMenu = findAll(itemsOfRestaurant, menuId, 'menuId');
    const restOfItems = [
      ...findRest(Items, restaurantId, 'restaurantId'),
      ...findRest(itemsOfRestaurant, menuId, 'menuId')
    ];

    Items = [
      ...restOfItems,
      ...itemsOfMenu.filter(item => {
        if ((item.id.toString() === id)) {
          result = new Result(item, null)
          return false;
        }

        return true;
      })
    ];

    return result;
  }
}

export default ItemService;
