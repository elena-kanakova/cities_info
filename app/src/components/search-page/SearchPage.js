import React from 'react'
import SearchForm from '../search-form'
import ResultItem from "../search-result/ResultItem";
import Agent from "../../services/agent";
import superagent from "superagent";

const CityContext = React.createContext({});
const CityProvider = CityContext.Provider;
const CityConsumer = CityContext.Consumer;

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

                const getCityInfo = await Agent.getCityInfo();

                const cityNames = [];

                const cityItemList = cityList.map(city => {
                    const cityItem = {
                        name: city.name,
                        population: city.population
                    };

                    let images;
                    let link = cityItem.link;

                    const getLinkNames = Object.keys(city._links).map((_linkName) => {
                        if (city._links[_linkName].name) {
                            cityItem[_linkName] = city._links[_linkName].name;
                        }
                    });

                    if (city._links['city:urban_area']) {
                        images = superagent.get(city._links['city:urban_area'].href)
                            .then(result => superagent.get(result.body._links['ua:images'].href))
                            .then(result => {
                                cityItem.image = result.body.photos[0].image.web;
                            });
                    } else {
                        cityItem.image = 'http://enjoy-summer.ru/image/cache/img_thumb_big.php-600x315.jpeg'
                    }

                    cityNames.push(cityItem);

                    return Promise.all([images, getLinkNames, link]);
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
