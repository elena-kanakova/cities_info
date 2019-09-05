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
        population: undefined
    };

    gettingWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        try {
            if (city) {
                const api_url = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: city});
                const data = api_url.body;
                console.log(data);

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
                console.log(getValue(data, 'matching_full_name').value);
                console.log(getValue(data, 'href').value);

                const api_url2 = await superagent.get(`${getValue(data, 'href').value}`);
                const data2 = api_url2.body;
                const data3 = getValue(data2, 'city:country').value;
                const data4 = getValue(data2, 'city:timezone').value;
                console.log(data2);
                console.log(getValue(data2, 'population').value);
                console.log(getValue(data3, 'name').value);
                console.log(getValue(data4, 'name').value);

                this.setState({
                    fullName: getValue(data, 'matching_full_name').value,
                    country: getValue(data3, 'name').value,
                    timeZone: getValue(data4, 'name').value,
                    population: getValue(data2, 'population').value
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
                        <SearchResult name={this.state.fullName} country={this.state.country} timeZone={this.state.timeZone} population={this.state.population} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CityInfo;
