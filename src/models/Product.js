import moment from 'moment';

export default class Product {
  constructor(id, name, description, image, expiry, orders, goal) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.expiry = expiry;
    this.orders = orders;
    this.goal = goal;
  }

  // Computed status object with value and text
  status() {
    if (this.orders >= this.goal) {
      return { value: 1, text: 'Fully funded', color: 'green' };
    }

    if (moment(this.expiry).isBefore(moment())) {
      return { value: 2, text: 'Expired', color: 'red' };
    }

    return { value: 0, text: 'Taking orders', color: 'blue' };
  }

  // Boolean, is product expired or not
  isExpired() {
    return this.status().value === 2;
  }

  // Returns orders/goal as a percentage
  progress() {
    let percent = (this.orders / this.goal) * 100;

    return percent > 100 ? 100 : percent;
  }

  formattedExpiry() {
    return moment(this.expiry).format('LLLL');
  }
}
