import { cart, removeItem, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProductWithId } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOptionWithId } from "../../data/deliveryOptions.js";
import renderPaymentSummary  from "./paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function renderOrderSummary() {
  let totalHtml = '';
  cart.forEach((cartItem) => {

  let matchingProduct = getProductWithId(cartItem.productId);
  
  let matchingDeliveryOption = getDeliveryOptionWithId(cartItem.deliveryOptionId);
    
      const today = dayjs();
      const addToToday = today.add(matchingDeliveryOption.deliveryDate, 'Days');
      const formatAddToToday = addToToday.format('dddd, MMMM D');
  
    totalHtml += `
      <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
        <div class="delivery-date js-delivery-date-${cartItem.productId}">
          Delivery date: ${formatAddToToday}
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
            ${generateDeliveryOptionHTML(cartItem)}
            
          </div>
        </div>
      </div>`;
  });
  document.querySelector('.js-order-summary').innerHTML = totalHtml;
  
  function generateDeliveryOptionHTML(cartItem) {
    let deliveryOptionHtml = '';
    let priceString;
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const addToToday = today.add(deliveryOption.deliveryDate, 'Days');
      const formatAddToToday = addToToday.format('dddd, MMMM D');
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
      
      deliveryOptionHtml += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${cartItem.productId}"
      data-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${formatAddToToday}
          </div>
          <div class="delivery-option-price">
            ${priceString = 
              deliveryOption.priceCents === 0 
              ? 'FREE' 
              :`$${formatCurrency(deliveryOption.priceCents)} -`} Shipping
          </div>
        </div>
      </div>
    `
    })
    return deliveryOptionHtml;
  }
  
  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const productToDeleteId = deleteButton.dataset.productId;
        const productToDeleteCard = document.querySelector(`.js-cart-item-container-${productToDeleteId}`);
  
        removeItem(productToDeleteId); // Remove item from cart
        renderPaymentSummary();
  
        productToDeleteCard.remove(); // Remove item from DOM
  
        updateHeaderQuantityElem(); // Update header quantity
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
          updateQuantity(productToUpdateId, newQuantity); // Update item quantity in cart
          renderPaymentSummary();
  
          document.querySelector(`.js-quantity-label-${productToUpdateId}`)
            .innerHTML = newQuantity;
    
          productToUpdateCard.classList.remove('is-updating-quantity');
          updateHeaderQuantityElem(); 
        }
      });
    });
  
  document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryDate) => {
      deliveryDate.addEventListener('click', () => {
        const {productId, optionId} = deliveryDate.dataset;
        updateDeliveryOption(productId, optionId); // Update delivery option in cart
        renderPaymentSummary();
        renderOrderSummary();
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
}

export default renderOrderSummary;