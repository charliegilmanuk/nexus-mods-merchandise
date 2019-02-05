import moment from '~/util/moment';
import ProductStatus from '~/models/ProductStatus';

export default class Product {
  /**
   * Creates an instance of Product.
   * @param {string} name
   * @param {text} description
   * @param {string} image
   * @param {datetime} expiry
   * @param {string} price
   * @param {integer} orders
   * @param {integer} goal
   * @memberof Product
   */
  constructor(id, name, description, image, expiry, price, orders, goal) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.expiry = moment(expiry).format('YYYY-MM-DD HH:mm:ss');
    this.price = price;
    this.orders = orders;
    this.goal = goal;
  }

  // Computed status object with value and text
  get status() {
    if (this.orders >= this.goal) {
      return new ProductStatus(1, 'Fully funded', 'green');
    }

    if (moment(this.expiry).isBefore(moment())) {
      return new ProductStatus(2, 'Expired', 'red');
    }

    return new ProductStatus(0, 'Taking orders', 'blue');
  }

  // Boolean, is product expired or not
  get expired() {
    return this.status.id === 2;
  }

  // Returns orders/goal as a percentage
  get progress() {
    let percent = (this.orders / this.goal) * 100;

    return percent > 100 ? 100 : percent;
  }

  // Human readable expiry date
  get formattedExpiry() {
    return moment(this.expiry).format('LLLL');
  }

  // Relative time until/since expiry
  get timeLeft() {
    return moment(this.expiry).fromNow();
  }
}
