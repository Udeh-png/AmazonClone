export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder( orderObject ) {
  orders.unshift(orderObject);
  saveOrderToLocalStorage();
}

function saveOrderToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
};