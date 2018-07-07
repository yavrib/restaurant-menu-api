export default class Item {
  id: number
  restaurantId: number
  menuId: number
  name: string

  constructor(id, restaurantId, menuId, name) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.menuId = menuId;
    this.name = name;
  }
}
