import React from 'react'
import SearchForm from '../search-form'
import ResultItem from "../search-result/ResultItem";
import Agent from "../../services/agent";
import superagent from "superagent";
import CityContext from '../../services/cityDataProvider';

class SearchPage extends React.Component {
    static contextType = CityContext;

    constructor(props) {
        super(props);
    }

    getCityInfo = async (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.city.value;

        try {
            if (searchValue) {
                const getCityInfo = await Agent.getCityInfo(e);
                const cityNames = [];
                const cityItemList = getCityInfo[0].map(city => {
                    const cityItem = {
                        name: city.name,
                        population: city.population,
                        geoname_id: city.geoname_id
                    };

                    let images;

                    Object.keys(city._links).forEach((_linkName) => {
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

                    return Promise.all([images]);
                });

                Promise.all(cityItemList).then(result => {
                    this.props.getCityData(cityNames);
                });
            }

        } catch (e) {
            console.log(e);
        }
    };

    showResult = () => {
        const cityInfo = this.context.cityInfo;

        if (!cityInfo || cityInfo.length === 0) {
            return <p>Введите название города</p>
        }

        return cityInfo.map((city, index) => {
            return <ResultItem key={index} cityDetail={city}/>;
        });
    };

    render() {

        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <section id="content">
                    <SearchForm city={this.getCityInfo}/>
                    <div className='result_wrap'>
                        {this.showResult()}
                    </div>
                </section>
            </div>
        );
    }
}

export default SearchPage;
