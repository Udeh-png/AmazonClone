export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder( orderObject ) {
  orders.unshift(orderObject);
  saveOrderToLocalStorage();
}

export function getOrderWithId(orderId) {
  let matchingOrder;
  orders.forEach( order => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}

export function getOrderProductWithId( orderId, productId ) {
  let matchingProduct;
  let order = getOrderWithId(orderId);

  order.products.forEach( product => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

function saveOrderToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
};