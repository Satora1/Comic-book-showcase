import "./AvailableComics.css"


function AvailableComics(props){
    console.log(props.comics)
    return (
        <>
        {[...props.comics].map(el=> (
        <div key={el.id} className="comic-list-card">
            <img className="comic-list-image" src={el.thumbnail.path + ".jpg"} alt="comic front page" />
            <div className="comic-list-title">{el.title}</div>
        </div>
        ))}
   </> )
}
export default AvailableComics