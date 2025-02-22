import { getProductWithId } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDeliveryOptionWithId } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

function renderPaymentSummary() {
  let html = '';

  let totalQuantity = 0;

  let totalPrice = 0;
  let deliveryOptionPrice = 0;
  let totalWithoutTaxes = 0;
  let totalWithTax = 0;
  let tax = 0;
  cart.forEach((cartItem) => {
    totalPrice += getProductWithId(cartItem.productId).priceCents * cartItem.quantity;
    deliveryOptionPrice += getDeliveryOptionWithId(cartItem.deliveryOptionId).priceCents
    totalQuantity += cartItem.quantity;
  });
  totalWithoutTaxes = totalPrice + deliveryOptionPrice;
  tax = totalWithoutTaxes * 0.1;
  totalWithTax = totalWithoutTaxes + tax;
  
  html = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-money-shipping">$${formatCurrency(deliveryOptionPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalWithoutTaxes)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-money-total">$${formatCurrency(totalWithTax)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary')
  .innerHTML = html;

  document.querySelector('.js-place-order')
  .addEventListener('click', async () => {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type' : 'Application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    })

    const order = await response.json();

    console.log(order);
  });
}
export default renderPaymentSummary;