import React from 'react'
import PropTypes from 'prop-types'
import './search-result.scss'
import {Link} from "react-router-dom";

class ResultItem extends React.Component {
    static propTypes = {
      cityDetail: PropTypes.shape({
          name: PropTypes.string.isRequired,
          urbanCountry: PropTypes.string.isRequired,
          urbanTimezone: PropTypes.string.isRequired,
          population: PropTypes.number.isRequired,
          image: PropTypes.string.isRequired
        }).isRequired
    };

    outputNameDictionary = {
        name: 'Название города',
        population: 'Население',
        'city:admin1_division': 'Админ округ',
        'city:country': 'Страна',
        'city:timezone': 'Временная зона',
        'city:urban_area': 'Район',
        image: 'Фото'
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
                   {/*<div className="basic-info_item flex">
                        <p className="basic-info_item-title">Временная зона:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.urbanTimezone}</p>
                    </div>*/}
                    {/*<div className="basic-info_item flex">
                        <p className="basic-info_item-title">Население:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.population}</p>
                    </div>*/}
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Фото:</p>
                    </div>
                    <div className="basic-info_item item-photo flex">
                        <img src={this.props.cityDetail.image} alt={this.props.cityDetail.name}/>
                    </div>
                </div>
                <div className="basic-info_link-full">
                    <Link to={`/name=${this.props.cityDetail.name}`}><p className="link-about">Посмотреть полную информацию</p></Link>
                </div>
            </article>
        )
    }
}

export default ResultItem;