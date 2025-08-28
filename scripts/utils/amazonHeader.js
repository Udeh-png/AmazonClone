import { cart } from "../../data/cart.js";

export let previousSearches =
  JSON.parse(localStorage.getItem("previousSearches")) || [];

export function updateCartQuantityElem() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  if (cartQuantity >= 0) {
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }
}

export function searchFromOtherPages(searchBar, searchButton) {
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      location.href = searchBar.value.trim()
        ? `index.html?query=${encodeURIComponent(searchBar.value)}`
        : `index.html`;
    });

    searchBar.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        location.href = searchBar.value.trim()
          ? `index.html?query=${encodeURIComponent(searchBar.value)}`
          : `index.html`;
      }
    });
    return;
  }
  location.href = searchBar.value.trim()
    ? `index.html?query=${encodeURIComponent(searchBar.value)}`
    : `index.html`;
}

function filterPreviousSearches(startsWith) {
  const startsWithLowercase = startsWith.toLowerCase();
  return previousSearches.filter((previousSearch) =>
    previousSearch.startsWith(startsWithLowercase)
  );
}

function renderPreviousSearches(array) {
  return array
    .map(
      (previousSearch) =>
        `
            <li class="previous-search">
              <button class="limit-text-to-2-lines previous-search-button js-previous-search-button" data-search-value="${previousSearch}">${previousSearch}</button>
              <button class="js-remove-previous-search previous-search-button" data-search-value="${previousSearch}">&#10006;</button>
            </li>
          `
    )
    .join("");
}

export function setUpSearchBar(
  searchBar,
  searchSuggestion,
  previousSearchList,
  fun
) {
  searchBar.addEventListener("input", () => {
    if (previousSearches.length > 0) {
      previousSearchList.innerHTML = renderPreviousSearches(
        filterPreviousSearches(searchBar.value)
      );
      setUpPrevSearchButton(
        previousSearchList,
        fun,
        searchSuggestion,
        searchBar
      );
    }
  });

  searchBar.addEventListener("focus", () => {
    if (previousSearches.length > 0) {
      searchSuggestion.classList.add("show-search-suggestion");
      previousSearchList.innerHTML = !searchBar.value.trim()
        ? renderPreviousSearches(previousSearches)
        : renderPreviousSearches(filterPreviousSearches(searchBar.value));
      setUpPrevSearchButton(
        previousSearchList,
        fun,
        searchSuggestion,
        searchBar
      );
    }
  });

  document.addEventListener("mouseup", (event) => {
    if (!document.querySelector(".js-search-div").contains(event.target)) {
      searchSuggestion.classList.remove("show-search-suggestion");
    }
  });
}

export function autofill(searchBar, previousSearchList, autofillWith) {
  searchBar.value = autofillWith;
  previousSearchList.innerHTML = renderPreviousSearches(
    filterPreviousSearches(searchBar.value)
  );
}

function setUpPrevSearchButton(
  previousSearchList,
  fun,
  searchSuggestion,
  searchBar
) {
  searchSuggestion
    .querySelectorAll(".js-previous-search-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        autofill(searchBar, previousSearchList, button.dataset.searchValue);
        searchSuggestion.classList.remove("show-search-suggestion");
        if (location.href.includes("index.html")) {
          fun();
        } else {
          searchFromOtherPages(searchBar);
        }
      });
    });

  searchSuggestion
    .querySelectorAll(".js-remove-previous-search")
    .forEach((button) => {
      button.addEventListener("click", () => {
        previousSearches = removeFromPreviousSearch(button.dataset.searchValue);
        localStorage.setItem(
          "previousSearches",
          JSON.stringify(previousSearches)
        );
        previousSearchList.innerHTML = renderPreviousSearches(previousSearches);
        setUpPrevSearchButton(
          previousSearchList,
          fun,
          searchSuggestion,
          searchBar
        );
      });
    });
}

function removeFromPreviousSearch(value) {
  return previousSearches.filter(
    (prevSearchValue) => prevSearchValue !== value
  );
}
