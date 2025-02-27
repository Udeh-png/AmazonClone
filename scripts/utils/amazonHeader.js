import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
export function updateCartQuantityElem() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })
    
    if (cartQuantity >= 0) {
      document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
    }
}

export function search(fun, query, fun1) {
  if (query.trim()){
    const filtered = products.filter((product) => {
      return product.keywords.some((keyword) => {
        return product.name.toLowerCase().includes(query) || keyword.toLowerCase().includes(query);
      })
    })
    filtered.length ? fun(filtered) : fun1();
  }else{
    fun(products)
  }
}

export function searchFromOtherPages() {
const searchBar = document.querySelector('.js-search-bar');

document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    if (searchBar.value.trim()) {
      location.href = `amazon.html?query=${encodeURIComponent(searchBar.value)}`
    }
  });

  searchBar.addEventListener('keyup', (event) => {
    if (event.key==='Enter' && searchBar.value.trim()) {
      location.href = `amazon.html?query=${encodeURIComponent(searchBar.value)}`
    }
  });
}