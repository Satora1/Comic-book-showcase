function ComicsSearchbar(props) {
    function handleInputClick(e) {
        props.setShowComicsRec(true)
    }
    function handleComicClick(e) {
        console.log([...props.comics].filter(el => el.title === e.target.innerText)[0].name)
        // comicCard Pop-up
    }

    return (
    <div className="comics_search_container">
        <input type="text" className="comics_search" placeholder="Search comics" onClick={(e) => handleInputClick(e)} onChange={(e) => props.setComicsSearch(e.target.value)}></input>
        {props.showComicsRec && (<div className="recommendations">{[...props.comics].filter(el => el.title.includes(props.comicsSearch)).map((el, i) => (<div className="comicName" key={i} onClick={(e) => handleComicClick(e)}>{el.title}</div>))}</div>)}
    </div>)
}

export default ComicsSearchbar