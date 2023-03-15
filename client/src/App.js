import './App.css';
import { useState, useEffect } from 'react'
import HeroSearchbar from './components/HeroSearchbar'


function App() {
  const [heroes, setHeroes] = useState("")
  const [comics, setComics] = useState("")
  const [heroSearch, setHeroSearch] = useState("")
  const [showHeroesRec, setShowHeroesRec] = useState(false)

  function handleGlobalClick(e) {
    console.log(e.target)
    if (e.target.className !== "hero_search") {
      setShowHeroesRec(false)
    }
  }

  useEffect(() => {
    const getHeroes = async () => {
      const response = await fetch('http://localhost:5000/heroes')
      const data = await response.json();
      setHeroes(data)
    }
    const getComics = async () => {
      const response = await fetch('http://localhost:5000/comics');
      const data = await response.json();
      setComics(data)
    }
    getComics()
    getHeroes()
  }, [])

  return (
    <div onClick={(e) => handleGlobalClick(e)} className="App">
      <HeroSearchbar setHeroSearch={setHeroSearch} heroSearch={heroSearch} heroes={heroes} setShowHeroesRec={setShowHeroesRec} showHeroesRec={showHeroesRec} />
    </div>
  );
}

export default App;
