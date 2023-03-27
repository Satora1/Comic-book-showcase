import "./AvailableComics.css";
import { useState } from "react";
import Modal from "react-modal";


//temporary?
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: "fit-content",
    },
};


function AvailableComics(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chosenComic, setChosenComic] = useState({})

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleComicClick(e) {
        const comic = [...props.comics].find(el => el.id == Number(e.currentTarget.id))
        // comicCard Pop-up
        setChosenComic(comic);
        setModalIsOpen(true);
    }


    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Comic-modal"
                appElement={document.getElementById("root") || undefined}
            >
                {modalIsOpen && <div className="comic-card-container">
                    <div className="image">
                        <img className="comic-image" src={chosenComic.thumbnail.path + ".jpg"} alt="comic front page" />
                    </div>
                    <div className="comic-card">
                        <h3 className="comic-title">{chosenComic.title}</h3>
                        <div className="comic-published-title">Published:</div>
                        <div className="comic-published">{chosenComic.dates[0].date.slice(0, 10)}</div>
                        <div className="comic-cover-artist-title">Cover Artist:</div>
                        <div className="comic-cover-artist">{chosenComic.creators.items[0].name}</div>
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
                                    <button type="button" className="add-to-cart" onClick="">Add to cart</button>
                                    <button type="button" className="buy-now" onClick="">Buy now</button>
                                </div>
                            </div>
                        
                    </div>
                </div>}
            </Modal>
            {[...props.comics].map(el => (
                <div key={el.id} id={el.id} className="comic-list-card" onClick={handleComicClick}>
                    <img className="comic-list-image" src={el.thumbnail.path + ".jpg"} alt="comic front page" />
                    <div className="comic-list-details-container">
                        <div className="comic-list-title">{el.title}</div>
                        <div className="comic-list-price">${el.prices[0].price}</div>
                    </div>
                </div>
            ))}
        </>)
}
export default AvailableComics