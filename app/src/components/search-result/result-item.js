import React from 'react'
import './search-result.scss'

function ResultItem({ city }) {
    return (
        <article className="result-item">
            <h3>Название города: { city.name }</h3>
            <div className="basic-info_wrap">
                <div className="basic-info_item flex">
                    <p className="basic-info_item-title">Страна:</p>
                    <p className="basic-info_item-desc">{ city.country }</p>
                </div>
                <div className="basic-info_item flex">
                    <p className="basic-info_item-title">Временная зона:</p>
                    <p className="basic-info_item-desc">{ city.timezone }</p>
                </div>
                <div className="basic-info_item flex">
                    <p className="basic-info_item-title">Краткое описание:</p>
                    <p className="basic-info_item-desc">{ city.desc }</p>
                </div>
            </div>
            <div className="basic-info_link-full">
                <a href="#" className="link-about">Посмотреть полную информацию</a>
            </div>
        </article>
    )
}

export default ResultItem;