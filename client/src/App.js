import './App.css';
import { useState, useEffect } from 'react'
import HeroSearchbar from './components/HeroSearchbar'
import ComicsSearchbar from './components/ComicsSearchbar'
import AvailableComics from './components/AvailableComics'
import LOGS from './components/SinginActions';
import Login from './components/Login';

function App() {
  const [heroes, setHeroes] = useState("")
  const [comics, setComics] = useState("")
  const [heroSearch, setHeroSearch] = useState("")
  const [showHeroesRec, setShowHeroesRec] = useState(false)
  const [comicsSearch, setComicsSearch] = useState("")
  const [showComicsRec, setShowComicsRec] = useState(false)
  const [display, setDisplay] = useState("home")
  const [showLoginForm, setShowLoginForm] = useState(false);


  function handleGlobalClick(e) {

    if (e.target.className !== "hero_search") {
      setShowHeroesRec(false)
    }
    if (e.target.className !== "comics_search") {
      setShowComicsRec(false)
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
      <div className="buttons">
        <div onClick={(e) => setDisplay("comics")}>COMICS</div>
        <div onClick={(e) => setDisplay("home")}>HOME</div>
        <div onClick={() => setShowLoginForm(true)}>LOGIN</div>
      </div>
      {display === "comics" && <AvailableComics comics={comics} />}
      {/* {display === "home"} */}
      <HeroSearchbar setHeroSearch={setHeroSearch} heroSearch={heroSearch} heroes={heroes} setShowHeroesRec={setShowHeroesRec} showHeroesRec={showHeroesRec} />
      <ComicsSearchbar setComicsSearch={setComicsSearch} comicsSearch={comicsSearch} comics={comics} setShowComicsRec={setShowComicsRec} showComicsRec={showComicsRec} />
      {showLoginForm && <Login showLoginForm = {showLoginForm} setShowLoginForm = {setShowLoginForm} />}
    </div>
  );
}

export default App;
