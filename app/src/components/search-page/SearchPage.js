import React from 'react'
import SearchForm from '../search-form'
import ResultItem from "../search-result/ResultItem";
import Agent from "../../services/agent";
import PropTypes from "prop-types";
import superagent from "superagent";
import {Link} from 'react-router-dom';

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityInfo: []
        };
    }

    getCityInfo = async (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.city.value;

        try {
            if (searchValue) {
                const cityList = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: searchValue})
                    .then(({body}) => Promise.all(body._embedded['city:search-results'].map(item => superagent.get(item._links['city:item'].href))))
                    .then(result => result.map(item => item.body));

                const cityNames = [];

                const cityItemList = cityList.map(city => {
                    const cityItem = {
                        name: city.name,
                        population: city.population
                    };

                    cityNames.push(cityItem);

                    let images, country, timeZone;
                    if (city._links['city:urban_area']) {
                        images = superagent.get(city._links['city:urban_area'].href)
                            .then(result => superagent.get(result.body._links['ua:images'].href))
                            .then(result => {
                                cityItem.image = result.body.photos[0].image.web;
                            });
                    } else {
                        cityItem.image = 'http://enjoy-summer.ru/image/cache/img_thumb_big.php-600x315.jpeg'
                    }

                    if (city._links['city:country']) {
                        country = superagent.get(city._links['city:country'].href)
                            .then(result => {
                                cityItem.urbanCountry = result.body.name;
                            });
                    } else {
                        cityItem.urbanCountry = 'Информация по местоположению отсуствует'
                    }

                    if (city._links['city:timezone']) {
                        timeZone = superagent.get(city._links['city:timezone'].href)
                            .then(result => {
                                cityItem.urbanTimezone = result.body.iana_name;
                            });
                    } else {
                        cityItem.urbanCountry = 'Информация по временной зоне отсуствует'
                    }

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

    debugger;
    showInfo = () => {
        const cityInfo = this.state.cityInfo;
        //debugger

        if (!cityInfo || cityInfo.length === 0) {
            return <p>Введите название города</p>
        }

        return cityInfo.map((city, index) => {
            //debugger
            return <ResultItem key={index} cityDetail={city}/>;
        });
    };

    render() {
        debugger
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

export default SearchPage;
