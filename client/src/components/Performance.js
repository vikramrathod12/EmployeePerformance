import React, { Component } from 'react';

import axios from 'axios';

import Select from 'react-select'

class Performance extends Component {
  componentDidMount = async e => {
    try {
        var formData = new FormData();
        const res = await axios.post('/performancescore', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    
        const resobj = res.data;
        var keys = Object.keys(resobj);
        
        var s = "<br/><br/><center><table><tr><th style='border: 1px solid #dddddd;text-align: center;padding: 5px;'>Quality</th><th style='border: 1px solid #dddddd;text-align: center;padding: 5px;'>Score</th></tr>";

            for (var i = 0; i < keys.length; i++) {
                if(keys[i] == "eno" || keys[i] == "total_reviews"){

                }
                else{
                    s = s + "<tr> <td style='border: 1px solid #dddddd; text-align: center; padding: 15px;'>" + keys[i]+"</td>" + "<td style='border: 1px solid #dddddd; text-align: center; padding: 15px;'>" + resobj[keys[i]].toFixed(2)  + "</td>" + "</tr>"
                }
            }

            s = s + "</table></center>"

            var divd = document.getElementById("data_div")
            divd.innerHTML = s + "<br/><br/>"
    
      } catch (err) {
          console.log(err)
      }

  }


  tablestyle = {
    border: "1px solid black"
  }




  render() {
    return (
      <div id ="data_div"> 

      </div>

    );
  }
}



export default Performance;
