import React from 'react'
import './search-result.scss'

class ResultItem extends React.Component {
    //debugger
    render() {
        return (
            <article className="result-item">
                <h3>Название города: {this.props.cityDetail.cityInfo.name}</h3>
                <div className="basic-info_wrap">
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Местоположение:</p>
                        <p className="basic-info_item-desc">{/*{this.props.cityDetails.continent}*/}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Временная зона:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.timeZone}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Население:</p>
                        <p className="basic-info_item-desc">{this.props.cityDetail.population}</p>
                    </div>
                    <div className="basic-info_item flex">
                        <p className="basic-info_item-title">Фото:</p>
                    </div>
                    <div className="basic-info_item flex">
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

export default ResultItem;