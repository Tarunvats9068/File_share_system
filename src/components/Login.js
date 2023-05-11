import React, {useState} from "react";
import axios from "axios"
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
         let data = await axios.post("http://localhost:5000/api/user_login",{
        email,password
      })
      if(data.status===200)
      { 
        console.log(data.data.data);
        localStorage.setItem("token",data.data.data);
        window.location.replace('/profile');
      }
};
return (
  <form onSubmit={handleRegister}>
      <div>
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
          <button className="btn btn-primary btn-block">Sign in</button>
        </div>
      </div>
  </form>
);
};

export default Login;