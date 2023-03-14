function Hero_searchbar(props) {
    function handleClick(e) {
        props.setShowHeroesRec(true)
    }
    return (
    <div className="hero_search_container">
        <input type="text" className="hero_search" placeholder="Search Your Hero" onClick={(e) => handleClick(e)} onChange={(e) => props.setHeroSearch(e.target.value)}></input>
        {props.showHeroesRec && (<div className="recommendations">{[...props.heroes].filter(el => el.name.includes(props.heroSearch)).map((el, i) => (<div className="heroName" key={i}>{el.name}</div>))}</div>)}
    </div>)
}

export default Hero_searchbar