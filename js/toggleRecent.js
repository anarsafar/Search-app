import { resultRecent } from "./recentResult.js";
import { form } from "./searchBar.js";
export const recentTab = document.querySelector(".recent-tab");

export const showRecent = () => {
  if (!form.classList.contains("activate-recent-tab") && resultRecent.length) {
    form.classList.add("activate-recent-tab");
    recentTab.classList.add("activate-recent-tab");
    document.addEventListener("click", closeRecent);
  }
};

const closeRecent = (e) => {
  if (!e.target.getAttribute("data") || resultRecent.length === 0) {
    form.classList.remove("activate-recent-tab");
    recentTab.classList.remove("activate-recent-tab");
    document.removeEventListener("click", closeRecent);
  }
};
