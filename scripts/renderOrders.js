import { getProductWithId, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { orders } from "../data/order.js";
import { searchFromOtherPages, updateCartQuantityElem } from "./utils/amazonHeader.js";
import { addToCart } from "../data/cart.js";

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
      ${renderOrderProducts(order)}
      </div>
    </div>
    `
  });
  
  document.querySelector('.js-orders-grid')
  .innerHTML = totalHtml;
  
  function renderOrderProducts(order) {
    let totalHtml = '';
    products.forEach((orderProduct) => {
      const product = getProductWithId(orderProduct.productId);
      totalHtml += `
      <div class="product-image-container">
        <image src = "${product.image}">
      </div>
      
      <div class="product-details-${orderProduct.productId}">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${new Date(orderProduct.estimatedDeliveryTime).toLocaleDateString('en-US', { day: '2-digit', month: 'long' })}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${orderProduct.productId}">
          <img class="buy-again-icon js-buy-again-icon before-added" src="images/icons/buy-again.png">
          <span class="before-added">
            Buy it again
          </span>
          <span class="after-added">
            &checkmark; Added
          </span>
        </button>
      </div>
      
      <div class="product-actions">
        <button
        class="track-package-button button-secondary js-track-package-button"
        data-product-id="${orderProduct.productId}"
        data-order-id="${order.id}">
          Track package
        </button>
      </div>
      `
    })
    return totalHtml;
  }
  updateCartQuantityElem();

  let timeOutId;
  
  document.querySelectorAll('.js-buy-again-button')
    .forEach((buyAgainButton) => {
      buyAgainButton.addEventListener('click', () => {
        const orderProductId = buyAgainButton.dataset.productId;

        document.querySelector(`.product-details-${orderProductId}`).classList.add('added-to-cart');
        addToCart(orderProductId, 1);
        updateCartQuantityElem();

        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
        document.querySelector(`.product-details-${orderProductId}`).classList.remove('added-to-cart');
        }, 1000);
      });
    })

  document.querySelectorAll('.js-track-package-button')
    .forEach((trackOrderButton) => {
      trackOrderButton.addEventListener('click', () => {
        const productId = trackOrderButton.dataset.productId;
        const orderId = trackOrderButton.dataset.orderId;

        location.href = `tracking.html?productId=${productId}&orderId=${orderId}`
      });
    });
}

searchFromOtherPages();

loadProductsFetch().then(() => {
  renderOrders();
})