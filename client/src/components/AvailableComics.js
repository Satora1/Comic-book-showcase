function AvailableComics(props){
    console.log(props.comics)
    return (<div>
        {[...props.comics].map(el=> (
        <div>{el.title}</div>
        ))}
    </div>)
}
export default AvailableComics