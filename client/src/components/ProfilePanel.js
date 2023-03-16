function ProfilePanel(props) {
    const nick = props.loggedIn[1].nick
    return (<div>
        <div>Hello, {nick}!</div>
        <button onClick={() => props.deleteAccount(nick)}>DELETE ACCOUNT</button>
    </div>)
}
export default ProfilePanel