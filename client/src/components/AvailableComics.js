import "./AvailableComics.css";
import { useState } from "react";
import Modal from "react-modal";
import ComicCard from "./ComicCard";


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
                {modalIsOpen &&
                    <ComicCard
                        chosenComic={chosenComic}
                        zIndex={2}
                        loggedIn={props.loggedIn}
                        closeModal={closeModal}
                        setShowLoginForm={props.setShowLoginForm}/>}
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