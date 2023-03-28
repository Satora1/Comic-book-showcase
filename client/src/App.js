import './App.css';
import { useState, useEffect } from 'react'
import HeroSearchbar from './components/HeroSearchbar'
import ComicsSearchbar from './components/ComicsSearchbar'
import AvailableComics from './components/AvailableComics'
import ProfilePanel from './components/ProfilePanel'
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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)



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
      setHeroes(data.heroes)
    }
    const getComics = async () => {
      const response = await fetch('http://localhost:5000/comics');
      const data = await response.json();
      setComics(data)
    }

    getComics()
    getHeroes()
  }, [])

  async function deleteAccount(nick) {
    await fetch('http://localhost:5000/api/login', {
      method: "delete",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nick })
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error())
    setLoggedIn(false)
    setDisplay("home")
  }

  return (
    <div>
      <div className='background-img'>
        <div className='toolbar'>
          <div onClick={(e) => handleGlobalClick(e)} className="App">
            <div className="buttons">

              <div onClick={(e) => setDisplay("comics")}>COMICS</div>
              <div onClick={(e) => setDisplay("home")}>HOME</div>
            </div>
            <div className='LogIn'>
              {(!showLoginForm && !showRegistrationForm && !loggedIn) &&

                <div className="log_manage" onClick={() => setShowLoginForm(true)}>Login</div>}
              {loggedIn && <div onClick={(e) => setDisplay("profile")}>PROFILE</div>}
              {loggedIn && <div className="log_manage" onClick={() => setLoggedIn(false)}>LOGOUT</div>}
            </div>
            {display === "profile" && <ProfilePanel loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              deleteAccount={deleteAccount} />}
            {display === "comics" && <div>

              <ComicsSearchbar setComicsSearch={setComicsSearch}
                comicsSearch={comicsSearch}
                comics={comics}
                setShowComicsRec={setShowComicsRec}
                showComicsRec={showComicsRec} />

              <div className="comic-list">
                <AvailableComics comics={comics} /></div></div>}

            {display === "home" && <HeroSearchbar setHeroSearch={setHeroSearch}
              heroSearch={heroSearch}
              heroes={heroes}
              setShowHeroesRec={setShowHeroesRec}
              showHeroesRec={showHeroesRec} />}

            {(showLoginForm || showRegistrationForm) &&
              <Login showLoginForm={showLoginForm}
                setShowLoginForm={setShowLoginForm}
                setShowRegistrationForm={setShowRegistrationForm}
                showRegistrationForm={showRegistrationForm}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn} />}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
