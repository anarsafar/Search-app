import { form } from "./searchBar.js";
const recentTab = document.querySelector(".recent-tab");

export const showRecent = () => {
  if (!form.classList.contains("activate-recent-tab")) {
    form.classList.add("activate-recent-tab");
    recentTab.classList.add("activate-recent-tab");
    document.addEventListener("click", closeRecent);
  }
};

export const closeRecent = (e) => {
  if (e.target.getAttribute("logo") || e.target.getAttribute("lang")) {
    form.classList.remove("activate-recent-tab");
    recentTab.classList.remove("activate-recent-tab");
    document.removeEventListener("click", closeRecent);
  }
};
