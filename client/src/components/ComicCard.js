import { useEffect, useState } from "react"
import axios from "axios"


function ComicCard({ chosenComic, loggedIn, closeModal, setShowLoginForm }) {
    const [commentContent, setCommentContent] = useState("")
    const [stars, setStars] = useState(0)
    const [chosenComicComments, setChosenComicComments] = useState([])

    const getComments = async () => {
        const response = await fetch('http://localhost:5000/comments');
        const data = await response.json();
        setChosenComicComments(data.filter(comment => comment.comicId === chosenComic.id))
    }

    useEffect(() => {
        getComments()
    }, [chosenComic]
    )

    async function AddComment(e, getComments) {
        e.preventDefault()
        const user = loggedIn[1].nick
        const id = chosenComic.id
        const response = async () => await axios.post("http://localhost:5000/comments", {
            user,
            id,
            commentContent,
            stars
        })
        response()
            .then(response => {
                setStars(0)
                setCommentContent("")
                getComments()
            }
            )
            .catch(error => console.error(error))
    }

    return (
        <>
            <div className="comic-card-container">
                <div className="image">
                    <img className="comic-image" src={chosenComic.thumbnail.path + ".jpg"} alt="comic front page" />
                </div>
                <div className="comic-card">
                    <h3 className="comic-title">{chosenComic.title}</h3>
                    <div className="comic-published-title">Published:</div>
                    <div className="comic-published">{chosenComic.dates[0].date.slice(0, 10)}</div>
                    <div className="comic-cover-artist-title">Cover Artist:</div>
                    <div className="comic-cover-artist">{chosenComic.creators.items[0].name ? chosenComic.creators.items[0].name : ""}</div>
                    <div className="comic-desc">{chosenComic.description}</div>
                </div>
                <div className="third-column">
                    <div className="button-div">
                        <button className="close-comic-button" onClick={closeModal}>X</button>
                    </div>
                    <div className="add-to-cart-popup">
                        <div className="comic-price">Price: ${chosenComic.prices[0].price}</div>
                        <div className="in-stock">Availability: in stock</div>
                        <div className="comic-display-cart-buttons">
                            <button type="button" className="add-to-cart" onClick={() => console.log("Added to cart")}>Add to cart</button>
                            <button type="button" className="buy-now" onClick={() => console.log("Sold!")}>Buy now</button>
                        </div>
                    </div>
                    <div className="add-stars">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                        {loggedIn && <form className="add-stars-form" onSubmit={(e) => AddComment(e, getComments)}>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(el => (
                                    <div id={el}
                                        key={el}
                                        style={el > stars ? { color: "grey" } : { color: "orange" }}
                                        onClick={(e) => setStars(e.target.id)}
                                        className="fa fa-star"></div>)
                                )}
                            </div>
                            <textarea className="comment-input" type="text" placeholder="Add Comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} rows="10" cols="50"></textarea>
                            <button type="submit" className="submit-comment" value="Add">Add comment</button>
                        </form>
                        }
                        {!loggedIn && <div className="stars-not-logged-in">To post comments, you have to be <a className="highlighted_click" onClick={() => setShowLoginForm(true)}>logged in</a></div>}
                    </div>
                </div>
            </div>
            <div>
                <div className="comments">
                    {chosenComicComments.filter(comment => comment.comicId === chosenComic.id).length !== 0 ? <h3 className="reviews">Reviews</h3> : ""}
                    {chosenComicComments.map(comment => (
                        <div key={comment.id} className="comment_container">
                            <div className="comment_top">
                                <div className="comment_user">{comment.user} </div>
                                <div className="comment_time"> {comment.date ? comment.date.slice(0, 10) : ""} {comment.date ? comment.date.slice(11, 19) : ""} </div>
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
        </>)
}

export default ComicCard