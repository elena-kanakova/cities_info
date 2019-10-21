import React from 'react'
import './index.css';
import SearchForm from './components/search-form/index'
import SearchResult from './components/search-result/index'
import superagent from "superagent";

const API_KEY = '6730c8df6acdcc426b019e426791955d';

class CityInfo extends React.Component {

    state = {
        temp: undefined,
        name: undefined,
        country: undefined
    };

    gettingWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        try {
            if (city) {
                const api_url = await superagent
                    .get('https://api.openweathermap.org/data/2.5/weather')
                    .query({q: city, appid: API_KEY, units: 'metric'});
                const data = api_url.body;
                console.log(data);

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country
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
                        <SearchResult temp={this.state.temp} city={this.state.city} country={this.state.country} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CityInfo;
