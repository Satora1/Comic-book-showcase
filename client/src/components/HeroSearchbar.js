function HeroSearchbar(props) {
    function handleInputClick(e) {
        props.setShowHeroesRec(true)
    }
    function handleHeroClick(e) {
        console.log([...props.heroes].filter(el => el.name === e.target.innerText)[0].name)
        // heroCard Pop-up
    }

    return (
    <div className="hero_search_container">
        <input type="text" className="hero_search" placeholder="Search Your Hero" onClick={(e) => handleInputClick(e)} onChange={(e) => props.setHeroSearch(e.target.value)}></input>
        {props.showHeroesRec && (<div className="recommendations">{[...props.heroes].filter(el => el.name.includes(props.heroSearch)).map((el, i) => (<div className="heroName" key={i} onClick={(e) => handleHeroClick(e)}>{el.name}</div>))}</div>)}
    </div>)
}

export default HeroSearchbar