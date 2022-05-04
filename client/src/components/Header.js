import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
  handleLogout = async () => {
    var formData = new FormData();
    try {
      const res = await axios.post('/logout', formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      });
  } catch (err) {
      console.log(err)
  }
    sessionStorage.clear();
    window.location = "/"
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{ backgroundColor: "#59b2ea" }}>
          <Link to={'/'}
            className="left brand-logo" style={{ marginLeft: "20px" }} >Performance Evaluation</Link>
          <button style={{ margin: "20px 40px 0 0", backgroundColor: "#59b2ea", border: "none", cursor: "pointer", fontSize: "20px", color: "white" }} className="right" onClick={this.handleLogout}>Logout</button>
        </div>
      </nav>
    );
  }
}



export default Header;
