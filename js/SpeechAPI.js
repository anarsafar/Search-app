export const RecognizeSpeech = () => {
  if ("webkitSpeechRecognition" in window) {
    const micIcon = document.querySelector(".mic-icon");
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";

    // speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    speechRecognition.onstart = () => {
      console.log("Speech Recognition Started");
    };
    speechRecognition.onerror = () => {
      console.log("Speech Recognition Error");
    };
    speechRecognition.onend = () => {
      console.log("Speech Recognition Ended");
    };

    speechRecognition.onresult = (event) => {
      let interim_transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      console.log(`Final transcript ${final_transcript}`);
      console.log(`Interim transcript ${interim_transcript}`);
    };

    micIcon.onclick = () => {
      speechRecognition.start();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }
};
