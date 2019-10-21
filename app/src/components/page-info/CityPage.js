import React from 'react'
import './page-info.scss'
import superagent from "superagent"
import CityContext from "../../services/cityDataProvider";

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {
    static contextType = CityContext;

    constructor(props,context) {
        super(props);
        debugger;
        const id = props.match.params.id;
        const cityInfoContext = context.cityInfo.find(item => item.geoname_id.toString() === id );
        this.state = {
            cityInfo: cityInfoContext
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

    getCityInfo = () => {
        const id = this.props.match.params.id;
        const cityInfoContext = this.context.cityInfo.find(item => item.geoname_id.toString() === id );
        debugger;

        if(!cityInfoContext || cityInfoContext.length === 0) {
            return this.getCityNewInfo().then(r => r)
        }
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
        debugger;
        const cityInfo = this.state.cityInfo;
        const background = {
            backgroundImage: `url("${this.state.cityInfo.image}")`
        };
        const unusedNames = ['image','name'];
        debugger;

        return (
            <div className="container">
                <header id="header" className="flex center" style={background}>
                    <h1>{this.state.cityInfo.name}</h1>
                </header>
                <div className="AppContent">
                    <div className="AppResult">
                        <div className='result_wrap'>
                            {Object.keys(cityInfo).filter((key) =>
                            unusedNames.indexOf(key) === -1).map((key) => (this.showCityInfoItem(key, cityInfo[key])))}
                        </div>
                    </div>
                </div>
            </div>
        )
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
        this.showCityInfo()
    }

    render() {
        debugger;
        return this.getCityInfo()
    }
}

export default CityPage;