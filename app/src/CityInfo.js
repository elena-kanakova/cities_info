import React from 'react'
import './index.css';
import ResultItem from "./components/search-result/ResultItem";
import CityPage from "./components/page-info/CityPage";
import Agent from "./services/agent";
import SearchPage from "./components/search-page/SearchPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class CityInfo extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={SearchPage} />
                        <Route path="/:id" component={CityPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default CityInfo;
