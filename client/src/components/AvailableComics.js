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
                        <img className="comic-image" src={chosenComic.thumbnail.path + ".jpg"} alt="comic front page" />
                    <div className="comic-card">
                        <button className="close-comic-button" onClick={closeModal}>X</button>
                        <h3 className="comic-title">{chosenComic.title}</h3>
                        <div className="comic-published-title">Published:</div>
                        <div className="comic-published">{chosenComic.dates[0].date}</div>
                        <div className="comic-cover-artist-title">Cover Artist:</div>
                        <div className="comic-cover-artist">{chosenComic.creators.items[0].name}</div>
                        <div className="comic-desc">{chosenComic.description}</div>
                    </div>
                </div>}
            </Modal>
            {[...props.comics].map(el => (
                <div key={el.id} id={el.id} className="comic-list-card" onClick={handleComicClick}>
                    <img className="comic-list-image" src={el.thumbnail.path + ".jpg"} alt="comic front page" />
                    <div className="comic-list-title">{el.title}</div>
                </div>
            ))}
        </>)
}
export default AvailableComics