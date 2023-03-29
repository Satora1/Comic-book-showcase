import AvailableComics from "./AvailableComics"
import ComicsSearchbar from "./ComicsSearchbar"
import Layout from './Layout'

function ComicsPage({ setComicsSearch, comicsSearch, comics, loggedIn, setShowComicsRecommendations,
    showComicsRecommendations, setShowLoginForm, setShowRegistrationForm, handleGlobalClick, showLoginForm, setLoggedIn, showRegistrationForm }) {

    return (
        <div>
            <div className='background-img'>
                <div onClick={(e) => handleGlobalClick(e)} className="App">
                    <Layout
                        showLoginForm={showLoginForm}
                        setShowLoginForm={setShowLoginForm}
                        showRegistrationForm={showRegistrationForm}
                        setShowRegistrationForm={setShowRegistrationForm}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                    />
                    <ComicsSearchbar
                        setComicsSearch={setComicsSearch}
                        comicsSearch={comicsSearch}
                        comics={comics}
                        loggedIn={loggedIn}
                        setShowComicsRecommendations={setShowComicsRecommendations}
                        showComicsRecommendations={showComicsRecommendations}
                        setShowLoginForm={setShowLoginForm} />
                    <AvailableComics setComicsSearch={setComicsSearch}
                        comicsSearch={comicsSearch}
                        comics={comics}
                        loggedIn={loggedIn}
                        setShowComicsRecommendations={setShowComicsRecommendations}
                        showComicsRecommendations={showComicsRecommendations}
                        setShowLoginForm={setShowLoginForm} />
                </div>
            </div>
        </div>)
}
export default ComicsPage