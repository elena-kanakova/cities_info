import React from 'react'
import './search-result.scss'
import {Link} from "react-router-dom";

class ResultItem extends React.Component {

    outputNameDictionary = {
        'city:country': 'Страна',
        image: 'Фото:'
    };

    elShowCityInfo = (name, content) => {
        let outputName = this.outputNameDictionary[name];

        return (
            <div className="basic-info_item flex">
                <p className="basic-info_item-title">{outputName}</p>
                <p className="basic-info_item-desc">{content}</p>
            </div>
        )
    };

    showCityInfo = () => {
        const cityInfo = this.props.cityDetail;
        const unusedNames = ['image','geoname_id','city:urban_area','city:timezone','city:admin1_division','population', 'name'];

        return Object.keys(cityInfo).filter((key) =>
            unusedNames.indexOf(key) === -1).map((key) => (this.elShowCityInfo(key, cityInfo[key])));
    };

    render() {
        return (
            <article className="result-item">
                <h3>Название города: {this.props.cityDetail.name}</h3>
                <div className="basic-info_wrap">
                    {this.showCityInfo()}
                    <div className="basic-info_item item-photo flex">
                        <img src={this.props.cityDetail.image} alt={this.props.cityDetail.name}/>
                    </div>
                </div>
                <div className="basic-info_link-full">
                    <Link to={`/city/${this.props.cityDetail.geoname_id}`}><p className="link-about">Посмотреть полную информацию</p></Link>
                </div>
            </article>
        )
    }
}

export default ResultItem;