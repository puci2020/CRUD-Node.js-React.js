import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import RiversList from "./components/rivers-list.component";
import EditRivers from "./components/edit-rivers.component";
import CreateRivers from "./components/create-rivers.component";

function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Rivers CRUD</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Rivers</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Create Rivers</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={RiversList}/>
                <Route path="/edit/:id" exact component={EditRivers}/>
                <Route path="/create" exact component={CreateRivers}/>
            </div>
        </Router>
    );
}

export default App;
