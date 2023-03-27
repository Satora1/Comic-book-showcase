import Premium from "./premium";

function ProfilePanel(props) {
    const nick = props.loggedIn[1].nick
    return (<div className="profile_panel">
        <div>Hello, {nick}!</div> 
        <h1>To Use Links Download ADblocker</h1> <Premium/>
        <button onClick={() => props.deleteAccount(nick)}>DELETE ACCOUNT</button>
      
    </div>)
}
export default ProfilePanel