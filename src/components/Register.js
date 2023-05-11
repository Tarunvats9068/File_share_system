import React, { useState} from "react";
import axios from "axios"
const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = async (e) => {
       e.preventDefault();
       console.log(email);
      let data = await axios.post("http://localhost:5000/api/user_signup",{
        email,password,username
      })
      if(data.status===200)
      {
        
        window.location.replace('/login');
      }
};
return (
  <form onSubmit={handleRegister}>
      <div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block">Sign Up</button>
        </div>
      </div>
  </form>
);
};

export default Register;