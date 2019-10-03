import React from 'react'
import './page-info.scss'
import superagent from "superagent"
import CityContext from "../../services/cityDataProvider";
//import StyleSheet from 'react-style';

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {
    static contextType = CityContext;

    constructor(props) {
        super(props);
        this.state = {
            cityInfo: ''
        };
    }

    outputNameDictionary = {
        name: 'Название города',
        population: 'Население',
        geoname_id: 'Geo id',
        'city:admin1_division': 'Админ округ',
        'city:country': 'Страна',
        'city:timezone': 'Временная зона',
        'city:urban_area': 'Район',
        image: 'Фото:'
    };

    showCityInfoItem = (name, content) => {

        let outputName = this.outputNameDictionary[name];

        return (
            <div className="basic-info_item flex">
                <p className="basic-info_item-title">{outputName}</p>
                <p className="basic-info_item-desc">{content}</p>
            </div>
        )
    };

    showCityInfo = () => {
        const { id } = this.props.match.params;
        const cityContextInfo = this.context.cityInfo.find(item => item.geoname_id.toString() === id);
        const cityNewInfo = this.state.cityInfo;
        const unusedNames = ['image','name'];

        if(!this.context.cityInfo || this.context.cityInfo.length === 0) {
            return Object.keys(cityNewInfo).filter((key) =>
                unusedNames.indexOf(key) === -1).map((key) => (this.showCityInfoItem(key, cityNewInfo[key])))
        } else {
            return Object.keys(cityContextInfo).filter((key) =>
                unusedNames.indexOf(key) === -1).map((key) => (this.showCityInfoItem(key, cityContextInfo[key])))
        }
    };

    getCityNewInfo = async () => {
        const id = `geonameid:${this.props.match.params.id}`;

        const cityNewInfo = await superagent
            .get(`https://api.teleport.org/api/cities/${id}/`)
            .then(result => result.body);

        const infoItem = {
            name: cityNewInfo.name,
            population: cityNewInfo.population,
            geoname_id: cityNewInfo.geoname_id
        };

        const getLinkNames = Object.keys(cityNewInfo._links).map(item => {
            if (cityNewInfo._links[item].name) {
                infoItem[item] = cityNewInfo._links[item].name;
            }
        });

        let images;

        if (cityNewInfo._links['city:urban_area']) {
            images = await superagent.get(cityNewInfo._links['city:urban_area'].href)
                .then(result => superagent.get(result.body._links['ua:images'].href))
                .then(result => {
                    infoItem.image = result.body.photos[0].image.web;
                });
        } else {
            images = 'http://enjoy-summer.ru/image/cache/img_thumb_big.php-600x315.jpeg'
        }

        this.setState({
            cityInfo: infoItem
        });

        return infoItem;
    };

    componentDidMount() {
        if(!this.context.cityInfo || this.context.cityInfo.length === 0) {
            this.getCityNewInfo().then(r => r)
        }
    }

    render() {
        const background = {
            backgroundImage: `url("${this.state.cityInfo.image}")`
        };

        return (
            <div className="container">
                <header id="header" className="flex center" style={background}>
                    <h1>{this.state.cityInfo.name}</h1>
                </header>
                <div className="AppContent">
                    <div className="AppResult">
                        <div className='result_wrap'>
                            {this.showCityInfo()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CityPage;