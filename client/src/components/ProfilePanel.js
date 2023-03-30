import Premium from "./premium";

function ProfilePanel(props) {
    const nick = props.loggedIn[1].nick
    return (
    <div>
    <div className="profile_panel">
        <div className="profile">Hello, {nick}!</div> 


        <button className="profile" onClick={() => props.deleteAccount(nick)}>DELETE ACCOUNT</button>
     
    </div>
     <Premium/>
    </div>)
}
export default ProfilePanel