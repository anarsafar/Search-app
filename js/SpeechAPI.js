import { search, setSearchFocus } from "./searchBar.js";
import { clearAboutLine, deleteSearchResults , buildSearchResults, setAboutLine} from "./searchResult.js";
import { displayRecent } from "./recentResult.js";
import { retrieveSearchResults } from './getData.js'

let speechRecognition = new webkitSpeechRecognition();

const speechResult = document.querySelector(".speech-result");
const container = document.querySelector(".speech-container");
const micIcon = document.querySelector(".mic-icon");
const close = document.querySelector(".clear");
// const tryAgain = document.querySelector(".try-again");

export const RecognizeSpeech = () => {
  if ("webkitSpeechRecognition" in window) {
    // speechRecognition.continuous = true; use it if you want continue
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    displayTranscript();
    getResult();
    displayUI();

  } else {
    console.log("Speech Recognition Not Available");
  }
};

const displayTranscript = () => {
  speechRecognition.onstart = () => {
    console.log("Speech Recognition Started");
    speechResult.innerHTML = "Listening...";
    container.classList.add("activate");
    document.body.classList.add('activate');
  };
  speechRecognition.onerror = () => {
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    console.log("Speech Recognition Ended");
    container.classList.contains("activate")
      ? container.classList.remove("activate") &&  document.body.classList.remove('activate')
      : null;
  };
};

const getResult = () => {
  speechRecognition.onresult = (event) => {
    let interim_transcript = "";
    let final_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    console.log(`Final transcript ${final_transcript}`);
    console.log(`Interim transcript ${interim_transcript}`);

    speechResult.innerHTML = final_transcript.length ? final_transcript : interim_transcript;
    final_transcript.length ? submitSearch(final_transcript) : null;
  };
};

const displayUI = () => {
  close.onclick = () => {
    speechRecognition.stop();
    container.classList.remove("activate");
    document.body.classList.remove('activate')
  };
  micIcon.onclick = () => speechRecognition.start();
};

const submitSearch = (final_transcript) => {
  deleteSearchResults();
  processSearch(final_transcript);
  setSearchFocus();
  search.value = final_transcript;
};

const processSearch = async (final_transcript) => {
  if(final_transcript === '') return
  clearAboutLine();
  displayRecent(final_transcript);
  const resultArray = await retrieveSearchResults(final_transcript);
  if (resultArray.length) buildSearchResults(resultArray);
  setAboutLine(resultArray.length);
}
