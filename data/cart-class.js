class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromLocalStorage();
  }

  #loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
      
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 3,
        deliveryOptionId: '3',
      }
    ];
  };

  saveCartInLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  addToCart(productId, quantity = 1) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId == cartItem.productId) {
        matchingItem = cartItem;
      }
    })
    
    if (matchingItem) {
      matchingItem.quantity += quantity;
    }else{
      this.cartItems.push({
        productId,
        quantity: quantity,
        deliveryOptionId: '1',
      });
    }
    this.saveCartInLocalStorage();
  };

  removeItem(productToDeleteId) {
    let productIsInCart = false;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productToDeleteId) {
        productIsInCart = true;
      }
    });
    let newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productToDeleteId);
    this.cartItems = newCart;
    saveCartInLocalStorage();
  };

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId == productId) {
        cartItem.quantity = newQuantity;
      }
    })
    this.saveCartInLocalStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveCartInLocalStorage();
  }
};
const cart = new Cart('cart-oop');

const businessCart = new Cart('cart-business');