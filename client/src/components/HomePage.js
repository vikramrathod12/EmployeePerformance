import React, { Component } from 'react';

import axios from 'axios';


class HomePage extends Component {
  componentDidMount = async e => {
    try {
      var formData = new FormData();
      const res = await axios.post('/currentuser', formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      });

      const username = res.data;
      var divC = document.getElementById('data_div');
      divC.innerHTML = "<h3>Hello "+username+"! Please Evaluate</h3>"

  } catch (err) {
      console.log(err)
  }


  }

  tablestyle = {
    border: "1px solid black"
  }
  divstyle = {
    marginBottom: "100px"
  }


  render() {
    return (
      <div>
        <div id="data_div" style={this.divstyle}>

        </div>

      </div>

    );
  }
}



export default HomePage;
