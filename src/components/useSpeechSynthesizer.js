import { useState } from 'react';

export default function useSpeechSynthesizer() {
  const synth = window.speechSynthesis;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const speak = (text) => {
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; 
    utterance.pitch = 1.5;
    synth.speak(utterance);

    utterance.onend = () => {
      stop()
    };

    setIsSpeaking(synth.speaking)
    setCurrentText(utterance.text);
  }

  const stop = async () => {
    synth.cancel();
    setIsSpeaking(synth.speaking);
  };

  const pauseResume = async () => {
    if(!synth.paused) synth.pause()
    else synth.resume()
    setIsSpeaking(synth.speaking);
  };

  return {
    speak,
    stop,
    pauseResume,
    isSpeaking,
    currentText,
  };
};