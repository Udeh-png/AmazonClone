import { cart, addToCart, loadFromLocalStorage, removeItem, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });
  it('adds existing items to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
      quantity: 1,
      deliveryOptionId: '1',
    }]));
    loadFromLocalStorage();
    addToCart('54e0eccd-8f36-462b-b68a-8182611d9add', 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('adds nonexisting items to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    loadFromLocalStorage();
    addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  afterEach(() => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        },{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2',
        }
      ]));

    loadFromLocalStorage();
  });

  afterEach(() => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('remove a productId that is in the cart', () => {
    removeItem(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('remove a productId that is not in the cart', () => {
    removeItem(1);
    expect(cart.length).toEqual(2);
  });
});

describe('test suite: updateDeliveryOption', () => {
  let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => {
    spyOn(localStorage, 'setItem').and.callFake(() => {});

    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        },{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2',
        }
      ])
    );

    loadFromLocalStorage();

    updateDeliveryOption(productId1, '3');
  });
  it('updates delivery option in cart', () => {
    expect(
      cart[0].deliveryOptionId
    ).toEqual('3');
  });

  it("doesn't disrupt the cart", () => {
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
  });
});