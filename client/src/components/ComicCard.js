import { useState } from "react"

function ComicCard({ chosenComic, loggedIn, closeModal, setShowLoginForm }) {
    const [commentContent, setCommentContent] = useState("")
    const [stars, setStars] = useState(0)

    function AddComment(e) {
        e.preventDefault()
        //commentContent
        e.target.children[1].value = ""
        setStars(0)
        setCommentContent("")
    }



    return <div className="comic-card-container">
        <img className="comic-image" src={chosenComic.thumbnail.path + ".jpg"} alt="comic front page" />
        <div className="comic-card">
            <button className="close-comic-button" onClick={closeModal}>X</button>
            <h3 className="comic-title">{chosenComic.title}</h3>
            <div className="comic-published-title">Published:</div>
            <div className="comic-published">{chosenComic.dates[0].date}</div>
            <div className="comic-cover-artist-title">Cover Artist:</div>
            <div className="comic-cover-artist">{chosenComic.creators.items[0].name}</div>
            <div className="comic-desc">{chosenComic.description}</div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {loggedIn && <form onSubmit={(e) => AddComment(e)}>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(el => (
                        el > stars ? (<div id={el}
                            style={{ color: "grey" }}
                            onClick={(e) => setStars(e.target.id)}
                            className="fa fa-star"></div>) :
                            (<div id={el}
                                style={{ color: "orange" }}
                                onClick={(e) => setStars(e.target.id)}
                                className="fa fa-star"></div>)
                    ))}
                </div>
                <input type="text" placeholder="Add Comment" onChange={(e) => setCommentContent(e.target.value)}></input>
                <input type="submit" className="submit-comment" value="Add"></input>
            </form>
            }
            {!loggedIn && <div>To post comments, you have to be <a onClick={() => setShowLoginForm(true)}>logged in</a></div>}
        </div>
    </div>
}

export default ComicCard