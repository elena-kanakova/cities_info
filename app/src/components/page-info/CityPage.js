import React from 'react'
import PropTypes from 'prop-types'
import './page-info.scss'
import Agent from "../../services/agent";
import superagent from "superagent"
import SearchForm from "../search-form";
import CityContext from "../../services/cityDataProvider";
import SearchPage from "../search-page/SearchPage";

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {
    static contextType = CityContext;

    constructor(props) {
        super(props);
        debugger;
        const { id } = props.match.params;
        const cityInfo = props.context.cityInfo.find(item => item.geoname_id.toString() === id );
        debugger;
        this.state = {
            isLoading: !cityInfo,
            cityInfo,
        }
    }

    componentDidMount() {
        if(this.state.isLoading) {
            const getCityFullInfo = async (e) => {
                const cityList = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({city_id: this.props.id})
                    .then(result => result.map(item => item.body));

                return Promise.all([cityList]);
            };
        }
    }

    outputNameDictionary = {
        name: 'Название города',
        population: 'Население',
        'city:admin1_division': 'Админ округ',
        'city:country': 'Страна',
        'city:timezone': 'Временная зона',
        'city:urban_area': 'Район',
        image: 'Фото:'
    };

    render() {
        debugger;

        const getUserItem = (name, content) => {

            let outputName = this.outputNameDictionary[name];

            return (
                <div className="basic-info_item flex">
                    <p className="basic-info_item-title">{outputName}</p>
                    <p className="basic-info_item-desc">{content}</p>
                </div>
            )
        };

        const userInfoItems = () => {
            // const { id } = this.props.match.params;
            // const cityInfo = this.context.cityInfo.find(item => item.geoname_id.toString() === id);
            const cityInfo = this.state.cityInfo;
debugger;
            return Object.keys(cityInfo).map((key) => (getUserItem(key, cityInfo[key])));
        };

        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <div className="AppContent">
                    <div className="AppResult">
                        <div className='result_wrap'>
                            <div>
                                { this.state.isLoading
                                    ?
                                    'Загружаю...'
                                    :
                                    userInfoItems()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CityPage;