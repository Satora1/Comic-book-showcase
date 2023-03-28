import { useEffect, useState } from "react"
import axios from "axios"

function ComicCard({ chosenComic, loggedIn, closeModal, setShowLoginForm }) {
    const [commentContent, setCommentContent] = useState("")
    const [stars, setStars] = useState(0)
    const [chosenComicComments, setChosenComicComments] = useState([])

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('http://localhost:5000/comments');
            const data = await response.json();
            setChosenComicComments(data.filter(comment => comment.comicId === chosenComic.id))
        }
        getComments()
    }, [chosenComicComments]
    )
    async function AddComment(e) {
        e.preventDefault()
        const user = loggedIn[1].nick
        const id = chosenComic.id
        const response = async () => await axios.post("http://localhost:5000/comments", {
            user,
            id,
            commentContent,
            stars
        });
        response()
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
            <div className="third-column">
                <div className="add-to-cart-popup">
                    <div className="comic-price">Price: ${chosenComic.prices[0].price}</div>
                    <div className="in-stock">Availability: in stock</div>
                    <div className="comic-display-cart-buttons">
                        <button type="button" className="add-to-cart" onClick={""}>Add to cart</button>
                        <button type="button" className="buy-now" onClick={""}>Buy now</button>
                    </div>
                </div>

            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            {loggedIn && <form onSubmit={(e) => AddComment(e)}>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(el => (
                        el > stars ? (<div id={el}
                            key={el}
                            style={{ color: "grey" }}
                            onClick={(e) => setStars(e.target.id)}
                            className="fa fa-star"></div>) :
                            (<div id={el}
                                key={el}
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
            <div>
                {[...chosenComicComments].map(comment => (
                    <div key={comment.id} className="comment_container">
                        <div className="comment_top">
                            <div className="comment_user">{comment.user}</div>
                            <div>{[1, 2, 3, 4, 5].map(el => (
                                el > comment.stars ? (<div id={el}
                                    key={el}
                                    style={{ color: "grey" }}
                                    className="fa fa-star"></div>) :
                                    (<div id={el}
                                        key={el}
                                        style={{ color: "orange" }}
                                        className="fa fa-star"></div>)
                            ))}</div>
                        </div>
                        <div className="comment_content">{comment.commentContent}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default ComicCard