import React, { Component } from 'react';

import axios from 'axios';

import Select from 'react-select'

class Evaluate extends Component {
  componentDidMount = async e => {
    try {
        var formData = new FormData();
        const res = await axios.post('/allemployees', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    
        const resarr = res.data;
        this.options1.slice(0, this.options1.length)
        for (var i = 0; i < resarr.length; i++) {
            this.options1.push({ value: resarr[i], label: resarr[i] })
        }
    
      } catch (err) {
          console.log(err)
      }

  }

  onSubmit = async e => {
    e.preventDefault();
    var myForm = document.getElementById('form_data');
    var formData = new FormData(myForm);
    try {
        const res = await axios.post('/insertdetails', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        window.location.href = "/"
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
  options1 = []

  options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 }
]
submitbtnstyle = {
    padding: "10px",
    backgroundColor: "#2BBBAD",
    border: "none",
    cursor: "pointer"
}

labelStyle ={
  color:"black",
  fontSize:"15px"
}

//   <label style={this.labelStyle} htmlFor=""></label><br /><br />
//     <Select id="" name="" options={this.options} isRequired />
/* <input type="" id="" name="" required/> */

  render() {
    return (
      <div>
        <br/>

        <form id="form_data" name="form_data" onSubmit={this.onSubmit} style={{ width: "280px" }}>
            <label style={this.labelStyle} htmlFor="employee_name">SELECT THE EMPLOYEE</label><br /><br />
            <Select id="employee_name" name="employee_name" options={this.options1} isRequired /><br /> 
            <label style={this.labelStyle} htmlFor="leadership">Score for Leadership</label><br /><br />
            <Select id="leadership" name="leadership" options={this.options} isRequired /><br />
            <label style={this.labelStyle} htmlFor="teamwork">Score for Teamwork</label><br /><br />
            <Select id="teamwork" name="teamwork" options={this.options} isRequired /><br />
            <label style={this.labelStyle} htmlFor="creativity">Score for Creativity</label><br /><br />
            <Select id="creativity" name="creativity" options={this.options} isRequired /><br />
            <label style={this.labelStyle} htmlFor="problemsolving">Score for Problem Solving</label><br /><br />
            <Select id="problemsolving" name="problemsolving" options={this.options} isRequired /><br />
            <input type="submit" value="Submit" style={this.submitbtnstyle} />
        </form>
      </div>

    );
  }
}



export default Evaluate;
