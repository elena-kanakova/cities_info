import React from 'react';
import superagent from 'superagent';

const CityContext = React.createContext({});
const CityProvider = CityContext.Provider;
const CityConsumer = CityContext.Consumer;

class Agent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cityList: []
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

                return Promise.all([cityList]).then(result =>
                {
                    this.setState({
                        cityList: cityList
                    });
                    console.log('cityList', this.state.cityList)
                });
            }

        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <CityProvider.Provider value={this.state.cityList}>

            </CityProvider.Provider>
        );
    }
}

export default new Agent();
export { Agent };
