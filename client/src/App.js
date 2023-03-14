import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [heroes, setHeroes] = useState("")
  const [comics, setComics] = useState("")

  useEffect(() => {
    if (heroes === "") {
      const getHeroes = async () => {
        const response = await fetch('https://gateway.marvel.com/v1/public/characters?apikey=1c4a632e0b889700b428b83563a3f86c&hash=6adf6ccdedcc9751f401b467a0b9bbfd&ts=1678713362&limit=100');
        const data = await response.json();
        setHeroes(data.data.results)
      }
      getHeroes()
    }
    if (comics === "") {
      const getComics = async () => {
        const response = await fetch('https://gateway.marvel.com/v1/public/comics?apikey=1c4a632e0b889700b428b83563a3f86c&hash=6adf6ccdedcc9751f401b467a0b9bbfd&ts=1678713362&limit=100');
        const data = await response.json();
        setComics(data.data.results)
      }
      getComics()
    }
  })

  return (
    <div className="App">
    </div>
  );
}

export default App;
