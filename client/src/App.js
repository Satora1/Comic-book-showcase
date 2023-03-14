import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const [heroes, setHeroes] = useState("")
  const [comics, setComics] = useState("")

  useEffect(() => {
    if (heroes === "") {
      const getHeroes = async () => {
        const response = await fetch('http://localhost:5000/heroes')
        const data = await response.json();
        setHeroes(data)
      }
      getHeroes()
    }
    if (comics === "") {
      const getComics = async () => {
        const response = await fetch('http://localhost:5000/comics');
        const data = await response.json();
        setComics(data)
      }
      getComics()
    }
  })
  console.log(comics, heroes)

  return (
    <div className="App">
    </div>
  );
}

export default App;
