import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import Header from './Header'
import HomePage from './HomePage';
import Login from './Login'
import useToken from './useToken'
import Evaluate from './Evaluate';
import Performance from './Performance';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <div>
        <div className="container-fluid">
          <Header />
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "10px",
                width: "300px",
                background: "#f0f0f0",
                margin: "3px 40px 0 0"
              }}
            >
              <ul style={{ marginLeft: "10px", listStyleType: "none", padding: 0 }}>
                <li style={{ margin: "20px 0" }}>
                  <Link to="/"><button style={{ width: "250px" }} className="waves-effect waves-light btn-large">Home</button></Link>
                </li>
                <li style={{ margin: "20px 0" }}>
                  <Link to="/evaluate"><button style={{ width: "250px" }} className="waves-effect waves-light btn-large">Evaluate</button></Link>
                </li>
                <li style={{ margin: "20px 0" }}>
                  <Link to="/performance"><button style={{ width: "250px" }} className="waves-effect waves-light btn-large">My Performance</button></Link>
                </li>

              </ul>
            </div>
            <div>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/evaluate" component={Evaluate} />
              <Route exact path="/performance" component={Performance} />
            </div>
          </div>

        </div>

      </div>
    </BrowserRouter>
  )

};

export default App;
