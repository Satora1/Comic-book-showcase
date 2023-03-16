function AvailableComics(props){
    console.log(props.comics)
    return (<div>
        {[...props.comics].map(el=> (
        <div>
            <div><img src={el.thumbnail.path + ".jpg"} alt="comic front page"/></div>
            <div>{el.title}</div>
        </div>
        ))}
    </div>)
}
export default AvailableComics