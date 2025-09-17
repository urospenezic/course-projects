/*
"Pseudo-Private" Properties
The addition of private fields and properties is relatively new - in the past, such a feature was not part of JavaScript.

Hence you might find many scripts that use a concept which you could describe as "pseudo-private" properties.

It would look like this:

class User {
    constructor() {
        this._role = 'admin';
    }
}
 
// or directly in an object
 
const product = {
    _internalId: 'abc1'
};
What's that?

It's a quite common convention to prefix private properties with an underscore (_) to signal that they should not be accessed from outside of the object.

Important: It's just a convention that should signal something! It does NOT technically prevent access. You CAN run this code without errors for example:

const product = {
    _internalId: 'abc1'
};
console.log(product._internalId); // works!
It's really just a hint that developers should respect. It's not as strict as the "real" private properties introduced recently (#propertyName).
*/

//NOTE: typeof classInstance will return 'object'. we can use isntanceOf like: classInstance instanceof ClassName;// returns true/false

/*
------------------------ OBJECT DESCRIPTORS -------------------------------------------------------------
const person = {name: 'smt', greet(){console.log(this.name)}};
Object.getOwnPropertyDescriptor(person); //we get back new object with property descriptors (js config that we can change), consist of : configurable(true/false), enumerable(true/false), vlaue, writable(true/false) for each property of the object
// we can use this to for example lock an object (make some prop readonly):

Object.defineProperty(person, 'name', {
    configurable: true,//if se to false we cannon delete the prop via "delete person.name"
    enumerable: true,
    value: person.name,
    writable: false
});



*/
class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes = []) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
class Product {
  // title = 'DEFAULT TITLE';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(id) {
    super(id);
  }

  get totalAmount() {
    return this.items.reduce((prev, curr) => prev + curr.price, 0);
  }

  set cartItems(value) {
    this.items = value;
    const total = this.totalAmount;
    this.totalOutput.innerHTML = `<h2>Total: \$${total.toFixed(2)}</h2>`; //output a string with 2 decimal places
  }

  addProduct(product) {
    const items = [...this.items]; //copy
    items.push(product);
    this.cartItems = items;
  }

  onOrderButtonClicked() {
    alert('ORDER WENT FINE!');
    console.log('[ORDERED ITEMS: ', this.cartItems);
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');

    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;

    cartEl
      .querySelector('button')
      .addEventListener('click', () => this.onOrderButtonClicked()); //we wrap via lambda to avoid this because we want to access products in event handler without having to bind this
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class Shop extends Component {
  constructor(id) {
    super(id);
  }
  render() {
    this.cart = new ShoppingCart(this.hookId);
    new ProductList(this.hookId);
  }
}

class ProductItem extends Component {
  constructor(product, id) {
    super(id, false); //we pass in false because the data isn't ready at this point, we need product to be added in the below line, but js doesn't allow any this before super() calls. alternative solution in ProductList
    this.product = product;
    this.render();
  }

  onAddProductClicked() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}"/>
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>`;
    const addBtn = prodEl.querySelector('button');
    addBtn.addEventListener('click', this.onAddProductClicked.bind(this));
  }
}

class ProductList extends Component {
  constructor(id) {
    super(id);
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        'A Pillow',
        'https://www.shutterstock.com/image-photo/blank-soft-pillow-on-white-260nw-1139461736.jpg',
        'A soft pillow',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://t4.ftcdn.net/jpg/00/89/76/09/240_F_89760942_RmpjUzGtDcERW1rlkNaifMr58NCVu7YB.jpg',
        'A red carpet',
        79.99
      ),
    ];

    this.renderProducts();
  }

  #products = []; //DECLARES A PRIVATE PROPERTY. VERY NEW TO JS, SUPPORTED ONLY BY CHROME ATM
  //IN THE FUTURE #renderProducts() WILL BE AVAILABLE TO DECLARE PRIVATE METHODS

  renderProducts() {
    for (const product of this.#products) {
      new ProductItem(product, this.hookId);
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);

    if (this.products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop('app');
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
