import React from "react";
import Signin from "./Signin"
import axios from "axios"
import Login from "./Login";

class LOGS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            showEditModal: false,

        }



    }




    /*    async deleteNote(id) {
           console.log("usuwanie notatjo ", id)
           const log = [...this.state.log].filter(note => note._id !== id);
           await axios.delete("http://localhost:9002/api/notes/" + id)
   
           this.setState({ notes })
       } */

    async addAccount(log) {
        const logs = [...this.state.logs];
        //add backaend
        const res = await axios.post("http://localhost:5000/log", log)
        const NewAccount = res.data
        //add to front
        logs.push(NewAccount)
        this.setState({ logs })
    }


    toggleModal() {
        this.setState({
            showEditModal: !this.state.showEditModal
        })
    }
   

    render() {
        return (
            <div>
                <Login />
                <Signin
                    onAdd={(log) => this.addAccount(log)} />
            </div>
        );
    }
}

export default LOGS;
