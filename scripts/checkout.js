import { cart, removeItem, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let totalHtml = '';
cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      matchingProduct = product;
    }
  });

  totalHtml += `
    <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${cartItem.productId}">
              Update
            </span>
            <input type="number" class="quantity-input update-quantity js-quantity-input-${cartItem.productId}">
            <span class="save-quantity-link js-save-quantity-link link-primary update-quantity"
             data-product-id="${cartItem.productId}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" 
            data-product-id = "${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
});
document.querySelector('.js-order-summary').innerHTML = totalHtml;

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productToDeleteId = deleteButton.dataset.productId;
      const productToDeleteCard = document.querySelector(`.js-cart-item-container-${productToDeleteId}`);

      removeItem(productToDeleteId);

      productToDeleteCard.remove();

      updateHeaderQuantityElem();
    });
  });

document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const productToUpdateId = updateButton.dataset.productId;
      const productToUpdateCard = document.querySelector(`.js-cart-item-container-${productToUpdateId}`);
      const quantityInputElem = document.querySelector(`.js-quantity-input-${productToUpdateId}`);
      quantityInputElem.value = document.querySelector(`.js-quantity-label-${productToUpdateId}`).innerHTML;
      
      productToUpdateCard.classList.add('is-updating-quantity');
    });
  });

document.querySelectorAll('.js-save-quantity-link')
  .forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const productToUpdateId = saveButton.dataset.productId;
      const productToUpdateCard = document.querySelector(`.js-cart-item-container-${productToUpdateId}`);
      const quantityInputElem = document.querySelector(`.js-quantity-input-${productToUpdateId}`);
      const newQuantity = Number(quantityInputElem.value);

      if (newQuantity > 0) {
        updateQuantity(productToUpdateId, newQuantity);

        document.querySelector(`.js-quantity-label-${productToUpdateId}`)
          .innerHTML = newQuantity;
  
        productToUpdateCard.classList.remove('is-updating-quantity');
        updateHeaderQuantityElem(); 
      }
    });
  });

function updateHeaderQuantityElem() {
  let totalCartQuantity = 0;
  const cartQuantityElem = document.querySelector('.js-return-to-home-link');
  cart.forEach((cartItem) => {
    totalCartQuantity+=cartItem.quantity;
  });
  cartQuantityElem.innerHTML = `${totalCartQuantity} Items`;
}

updateHeaderQuantityElem();