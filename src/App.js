import { useEffect, useState } from "react";
import useSpeechSynthesizer from './components/useSpeechSynthesizer';

export default function App() {
  const { speak, pauseResume, stop, isSpeaking } = useSpeechSynthesizer();

  const [error, setError] = useState("");
  const [data, setData] = useState();
  const [displayText, setDispayText] = useState([]);

  useEffect(() => {
    fetch("https://catfact.ninja/facts")
      .then((resp) => resp.json())
      .then((result) => {
        const tempData = result?.data.map((el) => {
          return el.fact;
        });
        setData(tempData);
        setDispayText([tempData[0]])
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const loadMore = () => {
    if (displayText.length >= data.length) return 
    setDispayText([data[displayText.length], ...displayText])
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Speechify Prep</h1>
      
      <button
        style={{ opacity: isSpeaking ? 0.5 : 1, marginRight: 10  }}
        onClick={() => {
          if(!isSpeaking) speak(displayText?.[0])
        }}
      >
        Play
      </button>

      <button
        style={{ opacity: isSpeaking ? 1 : 0.5, marginRight: 10 }}
        onClick={() => { if(isSpeaking) pauseResume() }}
      >
        Pause/Resume
      </button>

      <button
        style={{ opacity: !isSpeaking ? 0.5 : 1, marginRight: 10 }}
        onClick={() => stop()}
      >
        Stop
      </button>

      <button onClick={() => { loadMore() }}>Load More</button>

      {error && <p>Error: {error}</p>}
      
      {data && (
        <ul>
          {displayText?.map((el, key) => {
            return (
              <li key={key}>{el}</li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
