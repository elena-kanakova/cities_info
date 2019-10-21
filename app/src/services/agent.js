import React from 'react';
import superagent from 'superagent';

class Agent extends React.Component {
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
}

export default new Agent();
export { Agent };
