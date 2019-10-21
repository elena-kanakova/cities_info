import React from 'react'
import PropTypes from 'prop-types'
import './page-info.scss'

class FullInfo extends React.Component {
    static propTypes = {
        cityDetail: PropTypes.shape({
            name: PropTypes.string.isRequired,
            urbanCountry: PropTypes.string.isRequired,
            urbanTimezone: PropTypes.string.isRequired,
            population: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        }).isRequired
    };

    render() {
        debugger;

        return (
            <article className="result-item">
                бла бла бла
                <h3>Название города: {this.props.cityDetail.name}</h3>
                <div className="basic-info_wrap">
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Местоположение:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.urbanCountry}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Временная зона:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.urbanTimezone}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Население:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.population}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Фото:</p>
                    </div>
                    <div className="basic-info_item item-photo flex">
                        <img src={this.props.cityDetail.image} alt={this.props.cityDetail.name}/>
                    </div>
                </div>
                <div className="basic-info_link-full">
                    <a href="#" className="link-about">Посмотреть полную информацию</a>
                </div>
            </article>
        )
    }
}

export default FullInfo;