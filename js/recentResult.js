import { setSearchFocus } from "./searchBar.js";
import { search } from "./searchBar.js";
import { clearAboutLine, deleteSearchResults, setAboutLine, buildSearchResults } from "./searchResult.js";
import { recentTab } from "./toggleRecent.js";
import { retrieveSearchResults } from "./getData.js";

export let resultRecent =  JSON.parse(localStorage.getItem("resultRecent")) || [];

const allSearched = (query) => {
  if (query !== undefined) {
    resultRecent.unshift(query);
    localStorage.setItem("resultRecent", JSON.stringify(resultRecent))
  }
  return resultRecent;
};

const getLastTenSearched = (resultRecent) => {
  let getLastTen = [];
  getLastTen = resultRecent.slice(0, 10);
  return getLastTen;
};

export const displayRecent = (query) => {
  if (!resultRecent.includes(query) || query === undefined) {
    recentTab.innerHTML = "";
    getLastTenSearched(allSearched(query)).forEach((item) => {
      recentTab.innerHTML += `
            <div class="recent">
                  <div>
                     <span class="material-icons recent-icon">schedule</span>
                     <span class="links"><a class="getData" href="#">${item}</a></span>
                  </div>
                  <span class="remove">
                    <a href="#" class="remove-link" index=${item} data="toggle">Remove</a>
                  </span>
            </div>`;
    });
  }
  const getRecent = document.querySelectorAll(".getData");
  const removeButtons = document.querySelectorAll(".remove-link");
  processRemoving(removeButtons);
  processRecent(getRecent);
};

const processRecent = (getRecent) => {
  getRecent.forEach((item) => {
    item.addEventListener("click", submitLink);
  });
};

const submitLink = (e) => {
  e.preventDefault();
  deleteSearchResults();
  processLink(e);
  setSearchFocus();
};

const processLink = async (e) => {
  clearAboutLine();
  let query = e.target.innerHTML;
  const resultArray = await retrieveSearchResults(query);
  buildSearchResults(resultArray);
  setAboutLine(resultArray.length);
  search.value = query;
};

const processRemoving = (removeButtons) => {
  removeButtons.forEach((btn) => btn.addEventListener("click", deleteRecent));
};

const deleteRecent = (e) => {
  e.preventDefault();
  let index = e.target.getAttribute("index");
  resultRecent = resultRecent.filter((item) => item !== index);
  localStorage.setItem("resultRecent", JSON.stringify(resultRecent))
  displayRecent();
};
