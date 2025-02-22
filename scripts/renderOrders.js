import { getProductWithId, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { orders } from "../data/order.js";
import { updateCartQuantityElem } from "./utils/amazonHeader.js";

function renderOrders() {
  let products;
  let totalHtml = '';
  orders.forEach((order) => {
    products = order.products;
    totalHtml += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${new Date(order.orderTime).toLocaleDateString('en-US', { day: '2-digit', month: 'long' })}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>
      
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      
      <div class="order-details-grid">
      ${renderOrderProducts()}
      </div>
    </div>
    `
  });
  
  document.querySelector('.js-orders-grid')
  .innerHTML = totalHtml;
  
  function renderOrderProducts() {
    let totalHtml = '';
    products.forEach((orderProduct) => {
      const product = getProductWithId(orderProduct.productId);
      totalHtml += `
      <div class="product-image-container">
        <image src = "${product.image}">
      </div>
      
      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${new Date(orderProduct.estimatedDeliveryTime).toLocaleDateString('en-US', { day: '2-digit', month: 'long' })}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">
            Buy it again
          </span>
        </button>
      </div>
      
      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      `
    })
    return totalHtml;
  }

  updateCartQuantityElem();
}

loadProductsFetch().then(() => {
  renderOrders();
})
  