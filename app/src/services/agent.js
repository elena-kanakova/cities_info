import superagent from 'superagent';

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
}

export default new Agent();
export { Agent };
