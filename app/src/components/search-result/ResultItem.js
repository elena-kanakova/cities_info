import React from 'react'
import PropTypes from 'prop-types'
import './search-result.scss'
import {Link} from "react-router-dom";

class ResultItem extends React.Component {

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
            const cityInfo = this.props.cityDetail;

            return Object.keys(cityInfo).map((key) => (getUserItem(key, cityInfo[key])));
        };

        return (
            <article className="result-item">
                <h3>Название города: {this.props.cityDetail.name}</h3>
                <div className="basic-info_wrap">
                    {userInfoItems()}
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