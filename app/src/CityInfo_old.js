import React from 'react'
import './index.css';
import SearchForm from './components/search-form/index'
//import SearchResult from './components/search-result/index'
import superagent from "superagent";
import ResultItem from "./components/search-result/result-item";

const API_KEY = '6730c8df6acdcc426b019e426791955d';

class CityInfo_old extends React.Component {

    state = {
        city: [],
        res: [],
        fullName: undefined,
        country: undefined,
        resCountry: [],
        resGlobal: {},
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
                const resSearch = getValue(apiCitiesSearch, '_embedded').value;
                console.log(typeof resSearch, resSearch);
                console.log(dataCityBasicInfo);

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
                    resGlobal: apiCitiesSearch,
                    res: getValue(resSearch, 'city:search-results').value,
                    resCountry: getValue(dataCityBasicInfo, 'city:country').value,
                    fullName: getValue(apiCitiesSearch, 'matching_full_name').value,
                    country: getValue(dataCityCountry, 'name').value,
                    timeZone: getValue(dataCityTimezone, 'name').value,
                    population: getValue(dataCityBasicInfo, 'population').value,
                    image: getValue(dataCityImages, 'web').value
                });

                this.gettingWeather2(city).then((city) => this.setState ({city}));
            }
        } catch (err) {
            console.log('error');
        }
    };

    gettingWeather2 = async (cityName) => {
        const cities = await superagent
            .get('https://api.teleport.org/api/cities/')
            .query({search: cityName})
            .then(({ body }) => Promise.all(body._embedded['city:search-results'].map(item => superagent.get(item._links['city:item'].href))))
            .then(result => result.map(item => item.body));

        console.log(cities);

        const cityDetails = await Promise.all(cities.map(city => superagent.get(city._links['city:urban_area'].href)))
            .then(result => result.map(item => item.body.continent));

        console.log(cityDetails);

        return cityDetails;
    };

    show = () => {
        const res = this.state.resGlobal;
        {
            if (this.gettingWeather) {
                {console.log(`Это ${typeof this.state.resGlobal}`, this.state.resGlobal)}

                for (let value of Object.values(res)) {
                    console.log('resGlobal', value);
                    Object.keys(res).map(item => {
                    //debugger
                        return <ResultItem name={res[item].matching_full_name} country={res[item].country} timeZone={res[item].timeZone} population={res[item].population} image={res[item].image}/>;
                    });
                }
            }
        }
    };

    showInfo = () => {
        return this.state.city.map((item, index) => {
            return <ResultItem key={index} name={item} />
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
                        <SearchForm weatherMethod={this.gettingWeather}/>
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

export default CityInfo_old;
