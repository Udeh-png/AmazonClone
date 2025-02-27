import { addToCart } from "../data/cart.js";
import { loadProductsFetch, products as mainProducts } from "../data/products.js";
import { search, updateCartQuantityElem } from "./utils/amazonHeader.js";

const productGrid = document.querySelector('.js-product-grid')
function renderHomePage(products=mainProducts) {
  let totalHtml = '';
  products.forEach((product) => {
    totalHtml += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines" title="${product.name}">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStatsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class = "js-quantity-select-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${
              product.extraInfoHTML()
            }

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>
    `;
  })
  productGrid.innerHTML = totalHtml;

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    let timeoutId;
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantityElem = document.querySelector(`.js-quantity-select-${productId}`);
      const addedToCartElem = document.querySelector((`.js-added-to-cart-${productId}`));
      const quantity = Number(quantityElem.value);
      
      addToCart(productId, quantity);
      
      updateCartQuantityElem();
      
      addedToCartElem.classList.add('show-added-message');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        addedToCartElem.classList.remove('show-added-message');
      }, 3000);
    });
  });
  
  updateCartQuantityElem();
}

function searchNotFound() {
  productGrid.innerHTML = `
    <div class="search-not-found">
      <p>Search Not Found.</p>
      <button class="button-primary view-products-button js-view-products-button">
        View Products
      </button>
    </div>
  `
  document.querySelector('.js-view-products-button')
    .addEventListener('click', () => {
      window.location.href = 'amazon.html'
    });
}
const searchBar = document.querySelector('.js-search-bar');

document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    search(renderHomePage, searchBar.value);
  })

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    search(renderHomePage, searchBar.value, searchNotFound);
  }
})

function searchOnLoad() { 
  const searchParam = new URLSearchParams(location.search);
  const query = (searchParam.get('query'));
  if (query) {
    searchBar.value = query;
    search(renderHomePage, searchBar.value);
  }
}

loadProductsFetch().then((product) => {
  renderHomePage(product);
  searchOnLoad();
});