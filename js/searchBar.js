export const search = document.querySelector("input");
export const clear = document.querySelector(".clear-icon");
export const form = document.querySelector('form');

export const setSearchFocus = () => search.focus();

export const showClearButton = () => {
  if (search.value.length) {
    clear.classList.add("active");
  } else {
    clear.classList.remove("active");
  }
};

export const clearSearchBox = () => {
  search.value = "";
  clear.classList.remove("active");
  setSearchFocus();
};
