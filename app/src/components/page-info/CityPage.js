import React from 'react'
import PropTypes, {object} from 'prop-types'
import './page-info.scss'
import Agent from "../../services/agent";
import superagent from "superagent"
import SearchForm from "../search-form";
import CityContext from "../../services/cityDataProvider";
import SearchPage from "../search-page/SearchPage";

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {
    static contextType = CityContext;

    constructor(props, context) {
        super(props);
        debugger;
        this.state = {
            infoItem: ''
        };

        console.log(context);
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

    getCityItem = (name, content) => {

        let outputName = this.outputNameDictionary[name];

        return (
            <div className="basic-info_item flex">
                <p className="basic-info_item-title">{outputName}</p>
                <p className="basic-info_item-desc">{content}</p>
            </div>
        )
    };

    userInfoItems = () => {
        const { id } = this.props.match.params;
        const cityInfo = this.context.cityInfo.find(item => item.geoname_id.toString() === id);
        debugger;
        return Object.keys(cityInfo).map((key) => (this.getCityItem(key, cityInfo[key])));
    };

    showFullInfo = () => {
        const fullInfo = this.state.infoItem;

        return Object.keys(fullInfo).map((key) => (this.getCityItem(key, fullInfo[key])));
    };

    getCityFullInfo = async () => {
        const id = `geonameid:${this.props.match.params.id}`;
        debugger;
        const cityFullInfo = await superagent
            .get(`https://api.teleport.org/api/cities/${id}/`)
            .then(result => result.body);

        debugger;
        const infoItem = {
            name: cityFullInfo.name,
            population: cityFullInfo.population,
            geoname_id: cityFullInfo.geoname_id
        };

        const getLinkNames = Object.keys(cityFullInfo._links).map(item => {
            debugger;
            if (cityFullInfo._links[item].name) {
                infoItem[item] = cityFullInfo._links[item].name;
            }
        });

        let images;

        if (cityFullInfo._links['city:urban_area']) {
            images = await superagent.get(cityFullInfo._links['city:urban_area'].href)
                .then(result => superagent.get(result.body._links['ua:images'].href))
                .then(result => {
                    infoItem.image = result.body.photos[0].image.web;
                });
        } else {
            images = 'http://enjoy-summer.ru/image/cache/img_thumb_big.php-600x315.jpeg'
        }

        return infoItem;
    };

    componentDidMount() {
        debugger;
        if(!this.context.cityInfo || this.context.cityInfo.length === 0) {
            this.getCityFullInfo().then(r => this.setState({
                infoItem: r
            }));
        } else {
            this.userInfoItems();
        }
    }

    render() {
        debugger;

        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <div className="AppContent">
                    <div className="AppResult">
                        <div className='result_wrap'>
                            <div>
                                {
                                    !this.context.cityInfo || this.context.cityInfo.length === 0
                                    ?
                                        this.showFullInfo()
                                    :
                                    this.userInfoItems()
                                }
                                {true ? 'text' : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CityPage;