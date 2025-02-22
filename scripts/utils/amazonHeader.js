import { cart } from "../../data/cart.js";

export function updateCartQuantityElem() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })
    
    if (cartQuantity > 0) {
      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
    }
}