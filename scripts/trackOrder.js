import { getOrderProductWithId, getOrderWithId } from "../data/order.js";
import { getProductWithId, loadProducts, loadProductsFetch } from "../data/products.js";
import { searchFromOtherPages, updateCartQuantityElem } from "./utils/amazonHeader.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const orderId = params.get("orderId");

function renderTrackingPage() {
  const orderProduct = getOrderProductWithId(orderId, productId);
  const product = getProductWithId(productId);
  
  let totalHtml = `
  <div class="delivery-date">
  Arriving on ${new Date(orderProduct.estimatedDeliveryTime).toLocaleDateString('en-US', { day: '2-digit', month: 'long', weekday: 'long'})}
  </div>
  
  <div class="product-info">
  ${product.name}
  </div>
  
  <div class="product-info">
  Quantity: ${orderProduct.quantity}
  </div>
  
  <img class="product-image" src="${product.image}">
  
  <div class="progress-labels-container">
  <div class="progress-label current-status">
  Preparing
  </div>
  <div class="progress-label">
  Shipped
  </div>
  <div class="progress-label">
  Delivered
  </div>
  </div>
  
  <div class="progress-bar-container">
  <div class="progress-bar"></div>
  </div>
  `
  
  document.querySelector('.js-order-tracking')
  .innerHTML = totalHtml;

  updateCartQuantityElem();
}

searchFromOtherPages();

loadProductsFetch().then(() => {
  renderTrackingPage();
})