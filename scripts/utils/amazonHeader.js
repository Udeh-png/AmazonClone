import { cart } from "../../data/cart.js";

export const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || []

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

export function searchFromOtherPages(searchBar, searchButton) {
    searchButton.addEventListener('click', () => {
      location.href = searchBar.value.trim() ? `amazon.html?query=${encodeURIComponent(searchBar.value)}` : `amazon.html`
  });

  searchBar.addEventListener('keyup', (event) => {
    if (event.key==='Enter') {
      location.href = searchBar.value.trim() ? `amazon.html?query=${encodeURIComponent(searchBar.value)}` : `amazon.html`
    }
  });
}

function filterPreviousSearches(startsWith) {
  const startsWithLowercase = startsWith.toLowerCase();
  return previousSearches.filter((previousSearch) => previousSearch.startsWith(startsWithLowercase));
}

function renderPreviousSearches(array) {
  return array.map((previousSearch) => 
          `
            <li class="previous-search">
              <div class="limit-text-to-2-lines">${previousSearch}</div>
              <div>&#10006;</div>
            </li>
          `
        ).join('');
}


export function setUpSearchBar(searchBar, searchSuggestion, previousSearchList) {
  searchBar.addEventListener('input', (event) => {
    previousSearchList.innerHTML = renderPreviousSearches(filterPreviousSearches(event.target.value))
  })
  
  searchBar.addEventListener('focus', () => {
    searchSuggestion.classList.add('show-search-suggestion')
    previousSearchList.innerHTML = !searchBar.value.trim() ? renderPreviousSearches(previousSearches) : renderPreviousSearches(filterPreviousSearches(searchBar.value)); 
  });
  
  document.addEventListener('click', (event) => {
    if (!document.querySelector('.js-search-div').contains(event.target)) {
      searchSuggestion.classList.remove('show-search-suggestion');
    }
  });
}