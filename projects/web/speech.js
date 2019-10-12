const BS_WORDS = [
  'digital',
  'deadline',
  'urgent',
  'marketing',
  'business',
]

window.SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  null;

let recognizer, transcription;

export default {
  init() {
    if (window.SpeechRecognition === null) {
      console.log('Speech not supported')
    } else {
      recognizer = new window.SpeechRecognition();
      recognizer.lang = 'fr-FR';

      recognizer.continuous = true;
      recognizer.interimResults = false;

      recognizer.onresult = (event) => {
        transcription = '';
        for (let result of event.results) {
          if (result.isFinal) {
            transcription = result[0].transcript;
          } else {
            transcription += result[0].transcript;
          }
        }
        this.detectBullshit(transcription)
      };

      recognizer.onstop = () => this.startListening() // never stopping !!! 😈
      this.startListening();
    }
  },
  detectBullshit(text) {
    if (BS_WORDS.some(bs => text.includes(bs))) {
      axios.post('bs')
    }
  },
  startListening() {
    try {
      recognizer.start();
      console.log('Recognition started');
    } catch (e) {
      console.log(e.message);
    }
  },
  stopListening() {
    recognizer.stop();
    console.log('Recognition stopped');
  }
}