import React from 'react'
import './index.css';

function FullInfo() {
    const city = {name: 'New York', country: 'США', timezone: '', desc: 'Город мечты'};

    const styles = {
        backgroundImage: 'background-image'
    };

    return (
        <div className="container">
            <header id="header-inner" className="flex center" { styles.backgroundImage } = { city.image }>
                <h1>{ city.name }</h1>
            </header>
            <div className="page-content">
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
                <div className="city-gallery">
                    <div className="gallery-item">
                        <img src={ city.images } alt="Фото города"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullInfo;