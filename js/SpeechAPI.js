import { search, setSearchFocus, showClearButton } from "./searchBar.js";
import { clearAboutLine, deleteSearchResults, buildSearchResults, setAboutLine } from "./searchResult.js";
import { displayRecent } from "./recentResult.js";
import { retrieveSearchResults } from "./getData.js";

const speechResult = document.querySelector(".speech-result");
const container = document.querySelector(".speech-container");
const micIcon = document.querySelector(".mic-icon");
const close = document.querySelector(".clear");

export const RecognizeSpeech = () => {
  if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();

    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    displayTranscript(speechRecognition);
    getResult(speechRecognition);
    displayUI(speechRecognition);
  } else {
    micIcon.onclick = () => window.alert('Speech Recognition Not Available In Your Browser :(')
  }
};

const displayTranscript = (speechRecognition) => {
  speechRecognition.onstart = () => {
    console.log("Speech Recognition Started");
    speechResult.innerHTML = "Listening...";
    container.classList.add("activate");
    document.body.classList.add("activate");
  };
  speechRecognition.onerror = () => {
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    console.log("Speech Recognition Ended");
    if (container.classList.contains("activate")) {
      container.classList.remove("activate");
      document.body.classList.remove("activate");
    }
  };
};

const getResult = (speechRecognition) => {
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

    speechResult.innerHTML = final_transcript.length
      ? final_transcript
      : interim_transcript;
    final_transcript.length ? submitSearch(final_transcript) : null;
  };
};

const displayUI = (speechRecognition) => {
  close.onclick = () => {
    speechRecognition.stop();
    container.classList.remove("activate");
    document.body.classList.remove("activate");
  };
  micIcon.onclick = () => speechRecognition.start();
};

const submitSearch = (final_transcript) => {
  deleteSearchResults();
  processSearch(final_transcript);
  setSearchFocus();
  search.value = final_transcript;
  showClearButton();
};

const processSearch = async (final_transcript) => {
  if (final_transcript === "") return;
  clearAboutLine();
  displayRecent(final_transcript);
  const resultArray = await retrieveSearchResults(final_transcript);
  if (resultArray.length) buildSearchResults(resultArray);
  setAboutLine(resultArray.length);
};
