export default class Menu {
  id: number
  restaurantId: number
  name: string

  constructor(id, restaurantId, name) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.name = name;
  }
}
