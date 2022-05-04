import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials) {

  const data = await axios.post('/login', credentials, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (data.data === "Wrong Credentials") {
    alert("Wrong Credentials! Please try again!")
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    return null;
  }
  return data.data.token;
}

export default function Login({ setToken }) {


  const handleSubmit = async e => {
    e.preventDefault();
    var myForm = document.getElementById('form_data');
    var formData = new FormData(myForm);
    const token = await loginUser(formData);
    setToken(token);
  }

  const labelStyle = {
    fontSize: "20px",
    color: "black"
  }

  return (
    <div className="login-wrapper" style={{ width: "30%", margin: "150px auto" }}>
      <h4>Please Log In!</h4>
      <form id="form_data" name="form_data" onSubmit={handleSubmit}>
        <label style={labelStyle}>
          <p>Username</p>
          <input type="text" name="username" id="username" required />
        </label>
        <label style={labelStyle}>
          <p>Password</p>
          <input type="password" name="password" id="password" required />
        </label>
        <div><br />
          <button className="waves-effect waves-light btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
