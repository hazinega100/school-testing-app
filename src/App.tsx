import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {TestPage} from "../src/pages/TestPage";
import {HomePage} from "../src/pages/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions" element={<TestPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
