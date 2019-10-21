import React from 'react'
import './index.css';
import ResultItem from "./components/search-result/ResultItem";
import CityPage from "./components/page-info/CityPage";
import Agent from "./services/agent";
import SearchPage from "./components/search-page/SearchPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CityContext from "./services/cityDataProvider";

class CityInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityInfo: []
        };
    };

    getCityData = (cityInfo) => {
        this.setState({
            cityInfo: cityInfo
        })
    };

    render() {
        return (
            <CityContext.Provider value={this.state}>
                <Router>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => <SearchPage {...props} getCityData={this.getCityData} />}
                        />
                        <Route path="/city/:id" component={CityPage} />
                    </Switch>
                </Router>
            </CityContext.Provider>
        );
    }
}

export default CityInfo;
