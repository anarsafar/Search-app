import { search, clear, form, setSearchFocus, showClearButton, clearSearchBox} from "./searchBar.js";
import {buildSearchResults, clearAboutLine, setAboutLine, deleteSearchResults} from "./searchResult.js";
import { getSearchQuery, retrieveSearchResults } from "./getData.js";
import { showRecent } from './toggleRecent.js';
import { displayRecent } from "./recentResult.js";

document.addEventListener("readystatechange", (e) => {
  return e.target.readyState === "complete" ? initApp() : null;
});

const initApp = () => {
  setSearchFocus();
  search.addEventListener("input", showClearButton);
  search.addEventListener('click',showRecent);
  clear.addEventListener("click", clearSearchBox);
  form.addEventListener("submit", submitSearch);
};

export const submitSearch = (e) => {
  e.preventDefault();
  deleteSearchResults();
  processSearch();
  setSearchFocus();
};

const processSearch = async () => {
  clearAboutLine();
  const query = getSearchQuery();
  displayRecent(query);
  if (query === "") return;
  const resultArray = await retrieveSearchResults(query);
  if (resultArray.length) buildSearchResults(resultArray);
  setAboutLine(resultArray.length);
};
