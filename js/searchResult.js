const aboutLine = document.querySelector(".about-results");
const searchResults = document.querySelector(".results");

export const deleteSearchResults = () => {
  let child = searchResults.lastChild;
  while (child) {
    searchResults.removeChild(child);
    child = searchResults.lastChild;
  }
};

export const buildSearchResults = (resultArray) => {
  resultArray.forEach((result) => {
    searchResults.innerHTML += `
        <div class="result">
            <a href="https://en.wikipedia.org/?curid=${
              result.id
            }" target="_blank">${result.title}</a>
            <div>
                    ${
                      result.img !== null
                        ? `<div class="link-img">
                            <img src="${result.img}" alt="${result.title}" />
                           </div>`
                        : ""
                    }
                    <p>${result.text}</p>
                </div>
            </div>
        </div>`;
  });
};

export const clearAboutLine = () => {
  aboutLine.textContent = "";
};

export const setAboutLine = (numberOfResults) => {
  if (numberOfResults) {
    aboutLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    aboutLine.textContent = "Sorry, no results.";
  }
};
