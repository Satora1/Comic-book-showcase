import React, { useState } from "react";
import axios from "axios";




const Login = (props) => {

    const [showForm, setShowForm] = useState(false)
    const [nick, setnick] = useState("")
    const [password, setpassword] = useState("")





    const ChangeNickHandler = event => {
        const value = event.target.value;
        setnick(value)
    }

    const ChangePasswordHandler = event => {
        const value = event.target.value;
        setpassword(value)
    }


   
//Todo fetch  LOGS.get("/login",LogActions.getYourAccount) 
//pierszwy blok sprawdzanie statusu res.status ===404
//sprawdzasz czy jest 403 komunikat brak dostępu
//użytkownik jest zalogowany status 200 użytkownik do stata
//log out zrobić 

const LogToAccount = async event => {
    event.preventDefault(); 
  
    try {
      const response = await axios.get("http://localhost:5000/login", { nick, password });
  
      if (response.status === 200) {
        console.log("Login successful!");
        props.onLog({ nick, password });
        setnick("");
        setpassword("");
        setShowForm(false);
      } else if (response.status === 403) {
        console.log("Access denied!");
      } else if (response.status === 404) {
        console.log("Resource not found!");
      } else {
        console.log("An error occurred!");
      }
    } catch (error) {
      console.log(error);
    }
  };




    return (
        showForm ? (
            <div className="account-sheet">

                <form>

                    <label className="nick">Nick:</label>
                    <input type="nick" value={nick} onChange={ChangeNickHandler} />
                    <br />

                    <label className="password" >Password:</label>
                    <input type="text" value={password} onChange={ChangePasswordHandler} required />
                    <br />



                    <button className="Login" onClick={LogToAccount} >
                        
                        LogIn
                    </button>


                </form>
            </div>) : (
            <button className="log-in" onClick={() => setShowForm(true)}>login</button>
        )
    );

}

export default Login;