import React from 'react';
import Table from "./components/table";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" component={Table} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
