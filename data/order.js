export const orders = JSON.parse(localStorage.getItem('order')) || [{
    id: "ae0ed586-c059-489c-821b-0f8d1dceldaa",
    orderTime: "2025-02-22T20:19:20.3562",
    products: [
      {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          estimatedDeliveryTime: "2025-03-01T21:14:05.252Z",
          variation: null
      },
      {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          estimatedDeliveryTime: "2025-02-25T21:14:05.252Z",
          variation: null
      },
      {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 3,
          estimatedDeliveryTime: "2025-02-23T21:14:05.252Z",
          variation: null
      }
  ],
    totalCostCents: 8987 
  }];

export function addOrder( orderObject ) {
  orders.unshift(orderObject);
  saveOrderToLocalStorage();
  console.log(orders);
}

function saveOrderToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
};