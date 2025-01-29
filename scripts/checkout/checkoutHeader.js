import { cart } from "../../data/cart.js";
export function updateHeaderQuantityElem() {
    let totalCartQuantity = 0;
    const cartQuantityElem = document.querySelector('.js-return-to-home-link');
    cart.forEach((cartItem) => {
      totalCartQuantity+=cartItem.quantity;
    });
    cartQuantityElem.innerHTML = `${totalCartQuantity} Items`;
  }