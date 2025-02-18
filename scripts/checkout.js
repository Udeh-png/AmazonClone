import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-practice.js";
Promise.all([new Promise((reserve) => {
  loadProducts(() => {
    reserve();
  })
}), new Promise(( reserve) => {
  loadCart(() => {
    reserve();
  })
})]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve()
    })
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/