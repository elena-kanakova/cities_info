import React from 'react'
import './page-info.scss'
import superagent from "superagent"
import Agent from "../../services/agent";
import CityContext from "../../services/cityDataProvider";
//import StyleSheet from 'react-style';

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {
    static contextType = CityContext;

    constructor(props, context) {
        super(props);
        const id = props.match.params.id;
        debugger;
        const cityInfo = () => {
            if(!context.cityInfo || context.cityInfo.length === 0) {
                return [];
            } else {
                return context.cityInfo.find(item => item.geoname_id.toString() === id);
            }
        };
        debugger;
        this.state = {
            cityInfo: cityInfo()
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

        debugger;
        let outputName = this.outputNameDictionary[name];

        debugger;
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
        const unusedNames = ['image','name'];

        debugger;
        return Object.keys(cityInfo).filter((key) =>
            unusedNames.indexOf(key) === -1).map((key) => (this.showCityInfoItem(key, cityInfo[key])))

    };

    showCityTitle = () => {
        debugger;
        const background = {
            backgroundImage: `url("${this.state.cityInfo.image}")`
        };

        debugger;
        return (
            <header id="header" className="flex center" style={background}>
                <h1>{this.state.cityInfo.name}</h1>
            </header>
        )
    };

    componentDidMount() {
        if(this.state.cityInfo.length === 0) {
            const getCityNewInfo = Agent.getCityNewInfo(this.props.match.params.id).then(r => r);
            this.setState({
                cityInfo: getCityNewInfo
            })
        }
    }

    render() {

        debugger;
        return (
            <div className="container">
                {this.showCityTitle()}
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