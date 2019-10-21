import React from 'react'
import PropTypes from 'prop-types'
import './page-info.scss'
import SearchPage from "../search-page/SearchPage";
import {Link} from "react-router-dom";
import superagent from "superagent";
import ResultItem from "../search-result/ResultItem";

class CityPage extends React.Component {

    getCityFullInfo = async (e) => {
        const cityList = await superagent
            .get('https://api.teleport.org/api/cities/')
            .then(result => result.map(item => item.body));
    };

    render() {
        debugger;

        return (
            <main className="result-item">
                <h3>Название города: {this.props.match.params.name}</h3>
                <div className="basic-info_wrap">
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Местоположение:</p>
                        <p className="basic-info_item-desc">{this.props.match.params.urbanCountry}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Временная зона:</p>
                        <p className="basic-info_item-desc">{this.props.match.params.urbanTimezone}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Население:</p>
                        <p className="basic-info_item-desc">{this.props.match.params.population}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Фото:</p>
                    </div>
                    <div className="basic-info_item item-photo flex">
                        <img src={this.props.match.params.image} alt={this.props.match.params.name}/>
                    </div>
                </div>
            </main>
        )
    }
}

export default CityPage;