export let cart;

loadFromLocalStorage();
export function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}


function saveCartInLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem;
    
  cart.forEach((cartItem) => {
    if (productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  })
  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1',
    });
  }
  saveCartInLocalStorage();
}

export function removeItem(productToDeleteId) {
  let productIsInCart = false;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productToDeleteId) {
      productIsInCart = true;
    }
  });
  let newCart = cart.filter((cartItem) => cartItem.productId !== productToDeleteId);
  cart = newCart;
  saveCartInLocalStorage();
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      cartItem.quantity = newQuantity;
    }
  })
  saveCartInLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCartInLocalStorage();
}

export function emptyCart() {
  cart = [];
  saveCartInLocalStorage();
}

export function loadCart( fun ) {
  const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}