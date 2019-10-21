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
}

export default new Agent();
export { Agent };
