import superagent from 'superagent';

class Agent {

    getCityInfo = async (e) => {
        const searchValue = e.target.elements.city.value;
        const cityList = await superagent
            .get('https://api.teleport.org/api/cities/')
            .query({search: searchValue})
            .then(({body}) => Promise.all(body._embedded['city:search-results'].map(item => superagent.get(item._links['city:item'].href))))
            .then(result => result.map(item => item.body));

        return Promise.all([cityList]);
    };

    getCityNewInfo = async (cityId) => {
        const id = `geonameid:${cityId}`;
        const cityNewInfo = await superagent
            .get(`https://api.teleport.org/api/cities/${id}/`)
            .then(result => result.body);
        const infoItem = {
            name: cityNewInfo.name,
            population: cityNewInfo.population,
            geoname_id: cityNewInfo.geoname_id
        };

        Object.keys(cityNewInfo._links).map(item => {
            if (cityNewInfo._links[item].name) {
                infoItem[item] = cityNewInfo._links[item].name;
            }
        });

        if (cityNewInfo._links['city:urban_area']) {
            await superagent.get(cityNewInfo._links['city:urban_area'].href)
                .then(result => superagent.get(result.body._links['ua:images'].href))
                .then(result => {
                    infoItem.image = result.body.photos[0].image.web;
                });
        } else {
            infoItem.images = 'http://enjoy-summer.ru/image/cache/img_thumb_big.php-600x315.jpeg'
        }

        return infoItem;
    };
}

export default new Agent();
export { Agent };
