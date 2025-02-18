export let cart;

loadFromLocalStorage();
export function loadFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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

export function loadCart( fun ) {
  const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}