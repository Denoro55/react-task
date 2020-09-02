import React from 'react';
import Table from "./components/table";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Route to="/" component={Table} />
            </Router>
        </div>
    );
}

export default App;
