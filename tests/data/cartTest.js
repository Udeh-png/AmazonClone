import { cart, addToCart, loadFromLocalStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  it('adds existing items to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
      quantity: 1,
      deliveryOptionId: '1',
    }]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    loadFromLocalStorage();
    addToCart('54e0eccd-8f36-462b-b68a-8182611d9add', 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('adds nonexisting items to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    loadFromLocalStorage();
    addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});