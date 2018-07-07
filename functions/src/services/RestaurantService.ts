import Restaurant from '../models/Restaurant';
import BaseService from './BaseService';

import find from '../utils/find';
import Result from '../utils/result';
import isEmpty from '../utils/isEmpty';

let Restaurants: Array<Restaurant> = [
  {
    id: 1,
    name: 'Los Pollos Hermanos'
  },
  {
    id: 2,
    name: 'Hell\'s Kitchen'
  }
]

class RestaurantService implements BaseService<Restaurant> {
  getAll(): Result<Restaurant[], string> {
    return new Result([...Restaurants], null);
  }

  create(restaurant: Restaurant): Result<Restaurant, string> {
    Restaurants = [ ...Restaurants, restaurant ];

    return new Result(restaurant, null);
  }

  update(id: string, newRestaurant: Restaurant): Result<Restaurant, string> {
    let result = new Result(null, 'Restaurant does not exist.');
    Restaurants = Restaurants.map(restaurant => {
      if (restaurant.id.toString() === id) {
        result = new Result(newRestaurant, null);
        return newRestaurant;
      }

      return restaurant;
    });

    return result;
  }

  remove(id: string): Result<Restaurant, string> {
    let result = new Result(null, 'Restaurant does not exist');
    Restaurants = Restaurants.reduce((acc: Array<Restaurant>, restaurant) => {
      if (restaurant.id.toString() === id) {
        result = new Result(restaurant, null);
        return acc;
      }

      return [ ...acc, restaurant ];
    }, []);

    return result;
  }

  getOne(id: string): Result<Restaurant, string> {
    const restaurant = find(Restaurants, id, 'id');

    return new Result(restaurant, null);
  }
}

export default RestaurantService;
