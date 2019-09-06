import React from 'react'
import './index.css';
import SearchForm from './components/search-form/index'
import SearchResult from './components/search-result/index'
import superagent from "superagent";

const API_KEY = '6730c8df6acdcc426b019e426791955d';

class CityInfo extends React.Component {

    state = {
        fullName: undefined,
        country: undefined,
        timeZone: undefined,
        population: undefined,
        image: undefined
    };

    gettingWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        try {
            if (city) {
                const api_url = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: city});
                const apiCitiesSearch = api_url.body;
                const apiCityInfo = await superagent.get(`${getValue(apiCitiesSearch, 'href').value}`);
                const dataCityBasicInfo = apiCityInfo.body;
                const dataCityCountry = getValue(dataCityBasicInfo, 'city:country').value;
                const dataCityTimezone = getValue(dataCityBasicInfo, 'city:timezone').value;
                const dataCityBasicInfoUrban = getValue(dataCityBasicInfo, 'city:urban_area').value;
                const dataCityUrbanHref = getValue(dataCityBasicInfoUrban, 'href').value;
                const apiCityUrban = await superagent.get(`${dataCityUrbanHref}`);
                const dataCityUrban = apiCityUrban.body;
                const dataCityUrbanImages = getValue(dataCityUrban, 'ua:images').value;
                const dataCityImagesHref = getValue(dataCityUrbanImages, 'href').value;
                const apiCityImages = await superagent.get(`${dataCityImagesHref}`);
                const dataCityImages = apiCityImages.body;

                function getValue(object, key) {
                    let result;
                    return Object.keys(object).some(function (k) {
                        if (k === key) {
                            result = { value: object[k] };
                            return true;
                        }
                        if (object[k] && typeof object[k] === 'object' && (result = getValue(object[k], key))) {
                            return true;
                        }
                    }) && result;
                }

                this.setState({
                    fullName: getValue(apiCitiesSearch, 'matching_full_name').value,
                    country: getValue(dataCityCountry, 'name').value,
                    timeZone: getValue(dataCityTimezone, 'name').value,
                    population: getValue(dataCityBasicInfo, 'population').value,
                    image: getValue(dataCityImages, 'web').value
                })
            }
        } catch (err) {
            console.log('error');
        }
    };

    render() {
        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <div className="AppContent">
                    <div className="AppForm">
                        <SearchForm weatherMethod={this.gettingWeather}/>
                    </div>
                    <div className="AppResult">
                        <SearchResult name={this.state.fullName} country={this.state.country} timeZone={this.state.timeZone} population={this.state.population} image={this.state.image} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CityInfo;
