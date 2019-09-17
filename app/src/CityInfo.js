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


                const urbanArea = await Promise.all(cityList.map(city => superagent.get(city._links['city:urban_area'].href)))
                    .then(result => result.map(item => item.body));

                /*console.log(cities);
                console.log(cityDetails);*/


                let mumu = {
                    'a': {'name': '1'},
                    'b': {'name': '2'}
                };

                Object.keys( mumu).map((key) => {
                    let mumuObj =  mumu[key];
                    console.log(mumuObj);
                });

                let filteredCityList = [];
                cityList.forEach((city) => {
                    const {name, geoname_id, population} = city;

                    debugger;

                    filteredCityList.push({
                        name: name,
                        continent: '',//city.continent,
                        population: population,
                        geoname_id: geoname_id
                    });
                });

                if (cityList)
                    this.setState({cityList, filteredCityList});
            }
        } catch (e) {
            console.log('error');
        }
    };

    /*setCityInfo = () => {
        this.getCityInfo().then((cityInfo) => {
            const { name, population } = cityInfo;

            this.setState ({
                cityInfo: {
                    name: name,
                    continent: this.body.continent,
                    population: population
                }
            })
        });
    };*/

    getCityItem = (name) => {
        return (
            <ResultItem name={name}/>
        )
    };

    showInfo = () => {
        const cityList = this.state.cityList;
        debugger

        if (cityList)
            return Object.keys(cityList).map((key) => {
                let mumuObj = cityList[key];
                console.log(mumuObj);

                return <ResultItem key={key} mumu2={mumuObj}/>
            });
        /*return Object.keys(cityInfo).map((item, index) => {
            const {image, timeZone, population, name, continent} = '';

            debugger
            let mumuObj = {name: "123", 'image': '11'};
            return <ResultItem key={index} mumu2={mumuObj} image={image} name={item} continent={continent}
                               timeZone={timeZone} population={population}/>
        });*/
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
                                Имя: {this.showInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CityInfo;
