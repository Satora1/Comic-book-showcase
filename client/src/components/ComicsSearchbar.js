import Modal from "react-modal";
import { useState } from "react";

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

// Modal.setAppElement('.hero_search_container');

function ComicsSearchbar(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chosenComic, setChosenComic] = useState({})

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputClick(e) {
        props.setShowComicsRec(true)
    }
    function handleComicClick(e) {
        const comic = [...props.comics].filter(el => el.title === e.target.innerText)[0]
        // comicCard Pop-up
        setChosenComic(comic);
        setIsOpen(true);
    }

    return (
        <div className="comics_search_container">
            <input type="text" className="comics_search" placeholder="Search comics" onClick={(e) => handleInputClick(e)} onChange={(e) => props.setComicsSearch(e.target.value)}></input>
            {props.showComicsRec && (<div className="recommendations">{[...props.comics].filter(el => el.title.includes(props.comicsSearch)).map((el, i) => (<div className="comicName" key={i} onClick={(e) => handleComicClick(e)}>{el.title}</div>))}</div>)}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Comic-modal"
                appElement={document.getElementById("root")|| undefined}
            >
                {modalIsOpen && <div className="heroCard">
                    <button onClick={closeModal}>X</button>
                    <h2>Name: {chosenComic.name}</h2>
                    <div><img src={chosenComic.thumbnail.path + ".jpg"} alt="selected hero" /></div>
                    <div>Description: {chosenComic.description}</div>
                </div>}
            </Modal>
        </div>)
}

export default ComicsSearchbar