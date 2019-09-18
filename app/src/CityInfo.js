import React from 'react'
import './index.css';
import SearchForm from './components/search-form/index'
//import SearchResult from './components/search-result/index'
import superagent from "superagent";
import ResultItem from "./components/search-result/result-item";

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityInfo: []
        };
    }

    getCityInfo = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        try {
            if (city) {
                const cityList = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: city})
                    .then(({body}) => Promise.all(body._embedded['city:search-results'].map(item => superagent.get(item._links['city:item'].href))))
                    .then(result => result.map(item => item.body));

                console.log(cityList);

                const urbanArea = await Promise.all(cityList.map(city => superagent.get(city._links['city:urban_area'].href)))
                    .then(result => result.map(item => item.body));

                debugger;
                this.setState({
                    cityInfo: cityList
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    showInfo = () => {
        const cityList = this.state.cityInfo;
        debugger

        if (cityList)
            return cityList.map((city, index) => {
                return <ResultItem index={index} cityDetail={city}/>
            });
    };

    render() {

        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <div className="AppContent">
                    <div className="AppForm">
                        <SearchForm city={this.getCityInfo}/>
                    </div>
                    <div className="AppResult">
                        <div className='result_wrap'>
                            <div>
                                {this.showInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CityInfo;
