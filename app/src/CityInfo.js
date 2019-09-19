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
        const inputValue = e.target.elements.city.value;

        /*keysList = [
            {
                link: 'city:urban_area',
                field: 'urbanArea',
                path:
            },
            'city:country','city:timezone','city:alternate-names'
        ];*/

        try {
            if (inputValue) {
                const cityList = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: inputValue})
                    .then(({body}) => Promise.all(body._embedded['city:search-results'].map(item => superagent.get(item._links['city:item'].href))))
                    .then(result => result.map(item => item.body));

                const cityNames = [];

                const cityItemList = cityList.map(city => {
                    const cityItem = {
                        name: city.name,
                        population: city.population
                    };

                    cityNames.push(cityItem);

                    const images = superagent.get(city._links['city:urban_area'].href)
                        .then(result => superagent.get(result.body._links['ua:images'].href))
                        .then(result => {
                            cityItem.image = result.body.photos[0].image.web;
                        });

                    const country = superagent.get(city._links['city:country'].href)
                        .then(result => {
                            cityItem.urbanCountry = result.body.name;
                        });

                    const timeZone = superagent.get(city._links['city:timezone'].href)
                        .then(result => {
                            cityItem.urbanTimezone = result.body.iana_name;
                        });

                    return Promise.all([images, country, timeZone]);
                });

                Promise.all(cityItemList).then(result => this.setState({
                    cityInfo: cityNames
                }));
            }
        } catch (e) {
            console.log(e);
        }
    };

    showInfo = () => {
        const cityInfo = this.state.cityInfo;
        debugger

        if (cityInfo)
            return cityInfo.map((city, index) => {debugger
                return <ResultItem key={index} cityDetail={city}/>;
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
