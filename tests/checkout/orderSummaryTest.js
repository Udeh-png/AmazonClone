import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromLocalStorage } from "../../data/cart.js";
import renderPaymentSummary from "../../scripts/checkout/paymentSummary.js";
import { loadProducts } from "../../data/products.js";

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

beforeAll((done) => {
  loadProducts(() => {
    done();
  });
})

describe('test suite: renderOrderSummary', () => {

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        },{
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2',
        }
      ]);
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});

    document.querySelector('.js-test-container')
    .innerHTML = `
      <div class="js-return-to-home-link"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      `;
    
    loadFromLocalStorage();

    renderOrderSummary();  
  });

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = ``;
  });

  describe('displays the cart correctly', () => {
    it('renders the correct number of cart items', () => {
      expect(document.querySelectorAll('.js-cart-item-container').length)
        .toEqual(2);
    });
  
    it('renders the products in the cart', () => {
      expect(document.querySelector(`.js-cart-item-container-${productId1}`))
        .not.toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId2}`))
        .not.toEqual(null);
    });
  
    it('displays the correct quantities', () => {
      expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
        .toContain('Quantity: 2');

      expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
        .toContain('Quantity: 1');
    });
  
    it('displays the correct name of the products', () => {
      expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
        .toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

      expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
        .toEqual('Intermediate Size Basketball');
    });
  
    it('displays the correct price of the products', () => {
      expect(document.querySelector(`.js-product-price-${productId1}`).innerText)
        .toEqual('$10.90');
      expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
        .toEqual('$20.95');
    });
  });

  describe('removes from cart display', () => {
    beforeEach(() => {
      document.querySelector(`.js-delete-quantity-link-${productId1}`).click();      
    });

    it('removes product 1 from the cart', () => {
      expect(document.querySelector(`.js-cart-item-container-${productId1}`))
        .toEqual(null);
    });
  
    it('keeps product 2 in the cart', () => {
      expect(document.querySelector(`.js-cart-item-container-${productId2}`))
        .not.toEqual(null);
    });
  
    it('cart contains only one item', () => {
      expect(cart.length)
        .toEqual(1);
    });
  
    it('cart contains only product 2', () => {
      expect(cart[0].productId)
        .toEqual(productId2);
    });
  });

  describe('updates delivery option display', () => {
    beforeEach(() =>{
      document.querySelector(`.js-delivery-option-${productId1}-${3}`).click();
    });
    it('check the right radio button', () => {
      expect(
        document.querySelector(`.js-delivery-option-input-${productId1}-${3}`).checked
      ).toEqual(true);
    });

    it('updates the right delivery option', () => {
      expect(cart[0].deliveryOptionId).toEqual('3');
    });
  });
});